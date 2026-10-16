import { Injectable, signal } from '@angular/core'
import { initializeApp } from 'firebase/app'
import { getDatabase, onValue, push, ref, serverTimestamp } from 'firebase/database'
import { environment } from '../../environments/environment'
import { Game } from '../model/game-model'

interface GameRecord {
  name?: string
  createdAt?: number
}

@Injectable({ providedIn: 'root' })
export class GameService {

  private readonly database = getDatabase(initializeApp(environment.firebase))
  private readonly gamesRef = ref(this.database, 'games')
  private readonly _games = signal<Game[]>([])

  readonly games = this._games.asReadonly()

  constructor() {
    onValue(this.gamesRef, snapshot => {
      const games: Game[] = []
      snapshot.forEach(child => {
        const record = child.val() as GameRecord
        games.push({ id: child.key, name: record.name ?? '', createdAt: record.createdAt ?? 0 })
      })
      this._games.set(games.sort((a, b) => b.createdAt - a.createdAt))
    }, error => console.error('Impossible de lire les parties', error))
  }

  async createGame(name: string): Promise<string | null> {
    const gameRef = await push(this.gamesRef, {
      name,
      createdAt: serverTimestamp()
    })
    return gameRef.key
  }
}
