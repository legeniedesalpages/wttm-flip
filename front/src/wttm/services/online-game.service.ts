import { computed, effect, inject, Service, signal, untracked } from '@angular/core'
import { increment, onValue, ref, serverTimestamp, update } from 'firebase/database'
import { Game, Player } from '../model/game-model'
import { DeckService, DeckState } from './deck.service'
import { FirebaseService } from './firebase.service'
import { GameRecord, StatsRecord, toGame } from './game.service'

interface PlayerRecord {
  name?: string
  ready?: boolean
  readyAt?: number
}

type PilesRecord = Record<string, number[] | Record<string, number>>
type DeckRecord = Partial<Record<keyof DeckState, PilesRecord>>

/** Firebase ne stocke pas les tableaux vides : on reconstruit toujours 3 paquets */
function toPiles(record: PilesRecord | undefined, count: number): number[][] {
  return Array.from({ length: count }, (_, i) => Object.values(record?.[i] ?? {}) as number[])
}

@Service()
export class OnlineGameService {

  private readonly firebase = inject(FirebaseService)
  private readonly deck = inject(DeckService)
  private readonly database = this.firebase.database

  private gameId = ''
  private busy = false

  readonly game = signal<Game | null>(null)
  readonly loaded = signal(false)
  private readonly stats = signal<StatsRecord | null>(null)
  readonly players = signal<Player[]>([])
  readonly error = signal<string | null>(null)

  readonly isHost = computed(() => {
    const game = this.game()
    return game !== null && game.hostUid === this.firebase.uid()
  })
  readonly me = computed(() => this.players().find(player => player.uid === this.firebase.uid()))
  readonly waitingFor = computed(() => this.players().filter(player => !player.ready))

  constructor() {
    // Seul l'hôte pilote la partie : lancement automatique quand tout le monde est là, retournement quand tout le monde a joué
    effect(() => {
      const game = this.game()
      const players = this.players()
      if (!game || !this.isHost()) {
        return
      }
      if (game.status === 'waiting' && players.length >= game.maxPlayers) {
        untracked(() => void this.start())
      } else if (game.status === 'playing' && players.length > 0 && players.every(player => player.ready) && !this.deck.allDrawn()) {
        untracked(() => void this.flip())
      }
    })
  }

  /** Écoute la partie ; renvoie la fonction d'arrêt de l'écoute */
  connect(gameId: string): () => void {
    this.gameId = gameId
    this.game.set(null)
    this.loaded.set(false)
    this.stats.set(null)
    this.players.set([])
    this.error.set(null)
    this.busy = false
    this.deck.restore({ piles: [], discards: [] })

    const onError = () => this.error.set('Accès à la partie refusé : vous n\'en faites pas partie ou les règles Firebase ne sont pas à jour.')
    const stops: (() => void)[] = []
    void this.firebase.signIn().then(uid => {
      stops.push(
        onValue(ref(this.database, `games/${gameId}`), snapshot => {
          this.game.set(snapshot.exists() ? toGame(gameId, snapshot.val() as GameRecord) : null)
          this.loaded.set(true)
        }, onError),
        onValue(ref(this.database, `players/${gameId}`), snapshot => {
          const players: Player[] = []
          snapshot.forEach(child => {
            const record = child.val() as PlayerRecord
            players.push({ uid: child.key, name: record.name ?? '', ready: record.ready ?? false, readyAt: record.readyAt })
          })
          this.players.set(players)
        }, onError),
        onValue(ref(this.database, `stats/${gameId}`), snapshot => {
          this.stats.set(snapshot.val() as StatsRecord | null)
        }, error => console.warn('Statistiques indisponibles (règles Firebase à jour ?)', error)),
        onValue(ref(this.database, `states/${gameId}`), snapshot => {
          if (snapshot.exists()) {
            const value = snapshot.val() as DeckRecord
            this.deck.restore({
              piles: toPiles(value.piles, 3),
              discards: toPiles(value.discards, 3)
            })
          }
        }, onError)
      )
      console.debug('Connecté à la partie', gameId, 'uid', uid)
    })
    return () => {
      stops.forEach(stop => stop())
      // l'état d'une partie ne doit pas fuiter vers la suivante
      this.game.set(null)
      this.players.set([])
      this.stats.set(null)
    }
  }

  async markReady(): Promise<void> {
    const uid = this.firebase.uid()
    if (uid) {
      // Horodatage serveur : les temps des joueurs sont comparables entre eux
      await update(ref(this.database), {
        [`players/${this.gameId}/${uid}/ready`]: true,
        [`players/${this.gameId}/${uid}/readyAt`]: serverTimestamp()
      })
    }
  }

  /** Hôte : lance la partie (aussi utilisé pour forcer le lancement avec moins de joueurs) */
  async start(): Promise<void> {
    if (this.busy || this.game()?.status !== 'waiting') {
      return
    }
    this.busy = true
    try {
      this.deck.initGame()
      await update(ref(this.database), {
        [`states/${this.gameId}`]: this.deck.state(),
        [`games/${this.gameId}/status`]: 'playing',
        [`stats/${this.gameId}/startedAt`]: serverTimestamp(),
        [`stats/${this.gameId}/roundStartedAt`]: null
      })
    } finally {
      this.busy = false
    }
  }

  /** Hôte : retourne les cartes (ou mélange les paquets quand ils sont vides) et remet les joueurs à "pas encore joué" */
  async flip(): Promise<void> {
    if (this.busy) {
      return
    }
    this.busy = true
    try {
      const shuffling = this.deck.allDrawn()
      const roundStartedAt = this.stats()?.roundStartedAt
      const players = this.players()
      this.deck.flip()
      const updates: Record<string, unknown> = { [`states/${this.gameId}`]: this.deck.state() }
      for (const player of players) {
        updates[`players/${this.gameId}/${player.uid}/ready`] = false
      }
      if (shuffling) {
        updates[`stats/${this.gameId}/shuffles`] = increment(1)
        updates[`stats/${this.gameId}/roundStartedAt`] = null
      } else {
        updates[`stats/${this.gameId}/flips`] = increment(1)
        updates[`stats/${this.gameId}/roundStartedAt`] = serverTimestamp()
        // temps de chaque joueur entre l'affichage des cartes et son clic (le tour suivant un mélange n'est pas chronométré)
        if (roundStartedAt) {
          const round = `stats/${this.gameId}/rounds/${this.stats()?.flips ?? 0}`
          updates[`${round}/at`] = roundStartedAt
          for (const player of players) {
            if (player.readyAt) {
              updates[`stats/${this.gameId}/times/${player.uid}/ms`] = increment(Math.max(0, player.readyAt - roundStartedAt))
              updates[`stats/${this.gameId}/times/${player.uid}/count`] = increment(1)
              updates[`${round}/times/${player.uid}`] = Math.max(0, player.readyAt - roundStartedAt)
            }
          }
        }
      }
      await update(ref(this.database), updates)
    } finally {
      this.busy = false
    }
  }
}
