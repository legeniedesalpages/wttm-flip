export type GameMode = 'common' | 'distributed'
export type GameStatus = 'waiting' | 'playing' | 'finished'

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
  readyAt?: number
}

export interface NewGame {
  name: string
  mode: GameMode
  maxPlayers: number
  password: string
}

export interface PlayerRanking {
  uid: string
  name: string
  totalMs: number
  rounds: number
  averageMs: number | null
}

export interface RoundPoint {
  /** Début du tour en ms depuis le début de la partie */
  atMs: number
  /** Temps de chaque joueur (uid -> ms) */
  times: Record<string, number>
}

export interface GameSummary {
  name: string
  durationMs: number | null
  flips: number
  shuffles: number
  ranking: PlayerRanking[]
  rounds: RoundPoint[]
}
