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
import { Component, inject } from '@angular/core'
import { Router } from '@angular/router'
import { PageShellComponent } from '../../components/page-shell/page-shell.component'
import { CreateGameComponent } from '../../components/create-game/create-game.component'
import { GameListComponent } from '../../components/game-list/game-list.component'
import { GameService } from '../../services/game.service'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'wttm-home',
  imports: [PageShellComponent, CreateGameComponent, GameListComponent],
  template: `
    <wttm-page-shell>
      <wttm-create-game (gameCreated)="onGameCreated($event)" />
      <wttm-game-list [games]="gamesList()" (gameJoined)="onGameJoined($event)" />
    </wttm-page-shell>
  `
})
export class HomeComponent {
  
  protected readonly env = environment
  private readonly gameService = inject(GameService)
  private readonly router = inject(Router)

  constructor() {
    console.debug('Démarrage application, firebase projectId:', this.env.firebase.projectId)
  }

  protected readonly gamesList = this.gameService.games.value

  protected async onGameCreated(name: string): Promise<void> {
    await this.router.navigate(['/new'], { queryParams: { name } })
  }

  protected async onGameJoined(gameId: string): Promise<void> {
    const game = this.gamesList().find(candidate => candidate.id === gameId)
    if (!game) {
      return
    }
    if (game.mode === 'common' || await this.gameService.isMember(game.id)) {
      await this.router.navigate(['/game', game.id])
      return
    }
    await this.router.navigate(['/join', game.id])
  }
}
