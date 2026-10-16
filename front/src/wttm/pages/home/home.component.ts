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
 * Displays welcome message with header banner and footer copyright and version
 */
import { Component, ChangeDetectionStrategy, inject } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'
import { LayoutComponent } from '../../layout/layout.component'
import { CreateGameComponent } from '../../components/create-game/create-game.component'
import { GameListComponent } from '../../components/game-list/game-list.component'
import { GameService } from '../../services/game.service'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'wttm-home',
  imports: [LayoutComponent, CreateGameComponent, GameListComponent, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  
  protected readonly env = environment
  private readonly gameService = inject(GameService)

  constructor() {
    console.debug('Démarrage application, firebase projectId:', this.env.firebase.projectId)
  }

  protected readonly gamesList = this.gameService.games
  
  protected async onGameCreated(name: string): Promise<void> {
    try {
      const gameId = await this.gameService.createGame(name)
      console.debug('Partie enregistrée:', gameId, name)
    } catch (error) {
      console.error('Impossible d\'enregistrer la partie', error)
    }
  }

  protected onGameJoined(gameId: string): void {
    console.debug('Rejoindre la partie:', gameId)
    // TODO: Implémenter la logique de rejoindre une partie
  }
}
