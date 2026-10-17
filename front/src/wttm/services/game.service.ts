import { resource, Service, signal, type ResourceStreamItem } from '@angular/core'
import { initializeApp } from 'firebase/app'
import { getDatabase, onValue, push, ref, serverTimestamp } from 'firebase/database'
import { environment } from '../../environments/environment'
import { Game } from '../model/game-model'

interface GameRecord {
  name?: string
  createdAt?: number
}

@Service()
export class GameService {

  private readonly database = getDatabase(initializeApp(environment.firebase))
  private readonly gamesRef = ref(this.database, 'games')

  readonly games = resource<Game[], unknown>({
    defaultValue: [],
    stream: ({ abortSignal }) => {
      const result = signal<ResourceStreamItem<Game[]>>({ value: [] })
      const unsubscribe = onValue(this.gamesRef, snapshot => {
        const games: Game[] = []
        snapshot.forEach(child => {
          const record = child.val() as GameRecord
          games.push({ id: child.key, name: record.name ?? '', createdAt: record.createdAt ?? 0 })
        })
        result.set({ value: games.sort((a, b) => b.createdAt - a.createdAt) })
      }, error => result.set({ error }))
      abortSignal.addEventListener('abort', unsubscribe)
      return result
    }
  })

  async createGame(name: string): Promise<string | null> {
    const gameRef = await push(this.gamesRef, { name, createdAt: serverTimestamp() })
    return gameRef.key
  }
}
