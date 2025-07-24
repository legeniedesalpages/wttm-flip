/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 24/07/2025 - 12:33:05
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 24/07/2025
    * - Author          : renau
    * - Modification    : 
**/
/**
 * Game List component for WTTM Flip Cards application
 * Displays available games list with join functionality
 */
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'

interface Game {
  id: string
  creator: string
  playersCount: number
  maxPlayers: number
  status: 'waiting' | 'playing'
}

@Component({
  selector: 'wttm-game-list',
  imports: [MatButtonModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameListComponent {
  readonly games = input.required<Game[]>()
  
  readonly gameJoined = output<string>()
  
  protected joinGame(gameId: string): void {
    console.log('Rejoindre la partie:', gameId)
    this.gameJoined.emit(gameId)
    // TODO: Implémenter la logique de rejoindre une partie
  }
}
