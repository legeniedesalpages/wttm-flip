import { inject, resource, Service, signal, type ResourceStreamItem } from '@angular/core'
import { get, onValue, push, ref, runTransaction, serverTimestamp, set, update } from 'firebase/database'
import { Game, GameMode, GameStatus, GameSummary, NewGame, PlayerRanking } from '../model/game-model'
import { FirebaseService } from './firebase.service'

export interface GameRecord {
  name?: string
  createdAt?: number
  mode?: GameMode
  hostUid?: string
  maxPlayers?: number
  playerCount?: number
  status?: GameStatus
  hasPassword?: boolean
}

export interface StatsRecord {
  startedAt?: number
  endedAt?: number
  roundStartedAt?: number | null
  flips?: number
  shuffles?: number
  times?: Record<string, { ms?: number, count?: number }>
}

export function toGame(id: string, record: GameRecord): Game {
  return {
    id,
    name: record.name ?? '',
    createdAt: record.createdAt ?? 0,
    mode: record.mode ?? 'common',
    hostUid: record.hostUid ?? '',
    maxPlayers: record.maxPlayers ?? 0,
    playerCount: record.playerCount ?? 0,
    status: record.status ?? 'playing',
    hasPassword: record.hasPassword ?? false
  }
}

export class JoinError extends Error {
  constructor(readonly reason: 'wrong-password' | 'full-or-started') {
    super(reason)
  }
}

@Service()
export class GameService {

  private readonly firebase = inject(FirebaseService)
  private readonly database = this.firebase.database
  private readonly gamesRef = ref(this.database, 'games')

  readonly games = resource<Game[], unknown>({
    defaultValue: [],
    stream: ({ abortSignal }) => {
      const result = signal<ResourceStreamItem<Game[]>>({ value: [] })
      const unsubscribe = onValue(this.gamesRef, snapshot => {
        const games: Game[] = []
        snapshot.forEach(child => {
          games.push(toGame(child.key, child.val() as GameRecord))
        })
        result.set({ value: games.filter(game => game.status !== 'finished').sort((a, b) => b.createdAt - a.createdAt) })
      }, error => result.set({ error }))
      abortSignal.addEventListener('abort', unsubscribe)
      return result
    }
  })

  async getGame(id: string): Promise<Game | null> {
    await this.firebase.signIn()
    const snapshot = await get(ref(this.database, `games/${id}`))
    return snapshot.exists() ? toGame(id, snapshot.val() as GameRecord) : null
  }

  async createGame(options: NewGame): Promise<string | null> {
    const uid = await this.firebase.signIn()
    const distributed = options.mode === 'distributed'
    const password = options.password

    const gameRef = push(this.gamesRef)
    const id = gameRef.key
    if (!id) {
      return null
    }
    await set(gameRef, {
      name: options.name,
      createdAt: serverTimestamp(),
      mode: options.mode,
      hostUid: uid,
      maxPlayers: distributed ? options.maxPlayers : 0,
      playerCount: distributed ? 1 : 0,
      status: distributed ? 'waiting' : 'playing',
      hasPassword: distributed && password.length > 0
    })
    if (distributed) {
      if (password) {
        await set(ref(this.database, `secrets/${id}/hash`), await this.hashPassword(id, password))
      }
      await set(ref(this.database, `players/${id}/${uid}`), { name: options.name, joinedAt: serverTimestamp(), ready: false })
    }
    return id
  }

  /** Termine la partie pour tous les joueurs en supprimant toutes ses données */
  async deleteGame(id: string): Promise<void> {
    await update(ref(this.database), {
      [`games/${id}`]: null,
      [`secrets/${id}`]: null,
      [`players/${id}`]: null,
      [`states/${id}`]: null,
      [`stats/${id}`]: null
    })
  }

  /** Marque la partie distribuée comme terminée : les données sont conservées pour le résumé */
  async finishGame(id: string): Promise<void> {
    await update(ref(this.database), {
      [`games/${id}/status`]: 'finished',
      [`stats/${id}/endedAt`]: serverTimestamp()
    })
  }

  async getSummary(id: string): Promise<GameSummary | null> {
    await this.firebase.signIn()
    try {
      const [game, players, stats] = await Promise.all([
        get(ref(this.database, `games/${id}`)),
        get(ref(this.database, `players/${id}`)),
        get(ref(this.database, `stats/${id}`))
      ])
      if (!game.exists()) {
        return null
      }
      const record = stats.val() as StatsRecord | null
      const ranking: PlayerRanking[] = []
      players.forEach(child => {
        const time = record?.times?.[child.key]
        const rounds = time?.count ?? 0
        const totalMs = time?.ms ?? 0
        ranking.push({
          uid: child.key,
          name: (child.val() as { name?: string }).name ?? '',
          totalMs,
          rounds,
          averageMs: rounds > 0 ? totalMs / rounds : null
        })
      })
      // du plus lent au plus rapide, les joueurs sans temps à la fin
      ranking.sort((a, b) => (b.averageMs ?? -1) - (a.averageMs ?? -1))
      return {
        name: (game.val() as GameRecord).name ?? '',
        durationMs: record?.startedAt && record.endedAt ? record.endedAt - record.startedAt : null,
        flips: record?.flips ?? 0,
        shuffles: record?.shuffles ?? 0,
        ranking
      }
    } catch {
      return null
    }
  }

  async isMember(gameId: string): Promise<boolean> {
    const uid = await this.firebase.signIn()
    try {
      return (await get(ref(this.database, `players/${gameId}/${uid}`))).exists()
    } catch {
      return false
    }
  }

  async joinGame(game: Game, name: string, password: string): Promise<void> {
    const uid = await this.firebase.signIn()
    if (game.hasPassword) {
      try {
        await set(ref(this.database, `secrets/${game.id}/proofs/${uid}`), await this.hashPassword(game.id, password))
      } catch {
        throw new JoinError('wrong-password')
      }
    }
    // Les règles Firebase refusent l'incrément si la partie est pleine ou déjà lancée
    const seat = await runTransaction(ref(this.database, `games/${game.id}/playerCount`), count => (count ?? 0) + 1).catch(() => null)
    if (!seat?.committed) {
      throw new JoinError('full-or-started')
    }
    await set(ref(this.database, `players/${game.id}/${uid}`), { name, joinedAt: serverTimestamp(), ready: false })
  }

  /** Empreinte du mot de passe, liée à la partie : le mot de passe n'est jamais stocké en clair */
  private async hashPassword(gameId: string, password: string): Promise<string> {
    const data = new TextEncoder().encode(`${gameId}:${password}`)
    const digest = await crypto.subtle.digest('SHA-256', data)
    return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')
  }
}
