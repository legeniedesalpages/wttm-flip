export type GameMode = 'common' | 'distributed'
export type GameStatus = 'waiting' | 'playing'

export interface Game {
  id: string
  name: string
  createdAt: number
  mode: GameMode
  hostUid: string
  maxPlayers: number
  playerCount: number
  status: GameStatus
  hasPassword: boolean
}

export interface Player {
  uid: string
  name: string
  ready: boolean
}

export interface NewGame {
  name: string
  mode: GameMode
  maxPlayers: number
  password: string
}
