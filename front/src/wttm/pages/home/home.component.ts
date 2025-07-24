/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 23/07/2025 - 23:09:16
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 23/07/2025
    * - Author          : renau
    * - Modification    : 
**/
/**
 * Home page component for WTTM Flip Cards application
 * Displays welcome message with header banner and footer copyright
 */
import { Component, ChangeDetectionStrategy, signal } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'
import { LayoutComponent } from '../../layout/layout.component'
import { CreateGameComponent } from '../../components/create-game/create-game.component'
import { GameListComponent } from '../../components/game-list/game-list.component'

interface Game {
  id: string
  creator: string
  playersCount: number
  maxPlayers: number
  status: 'waiting' | 'playing'
}

@Component({
  selector: 'wttm-home',
  imports: [LayoutComponent, CreateGameComponent, GameListComponent, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  protected readonly currentYear = new Date().getFullYear()
  
  protected readonly gamesList = signal<Game[]>([
    { id: '1', creator: 'Alice', playersCount: 2, maxPlayers: 4, status: 'waiting' },
    { id: '2', creator: 'Bob', playersCount: 4, maxPlayers: 4, status: 'playing' },
    { id: '3', creator: 'Charlie', playersCount: 1, maxPlayers: 6, status: 'waiting' },
    { id: '4', creator: 'Diana', playersCount: 3, maxPlayers: 4, status: 'waiting' },
    { id: '5', creator: 'Eve', playersCount: 2, maxPlayers: 2, status: 'playing' },
    { id: '6', creator: 'Frank', playersCount: 1, maxPlayers: 3, status: 'waiting' },
    { id: '7', creator: 'Grace', playersCount: 5, maxPlayers: 6, status: 'playing' },
    { id: '8', creator: 'Henry', playersCount: 2, maxPlayers: 4, status: 'waiting' },
    { id: '9', creator: 'Ivy', playersCount: 3, maxPlayers: 3, status: 'playing' },
    { id: '10', creator: 'Jack', playersCount: 1, maxPlayers: 5, status: 'waiting' }
  ])
  
  protected onGameCreated(playerName: string): void {
    console.log('Partie créée par:', playerName)
    // TODO: Implémenter la logique de création de partie
  }

  protected onGameJoined(gameId: string): void {
    console.log('Rejoindre la partie:', gameId)
    // TODO: Implémenter la logique de rejoindre une partie
  }
}
