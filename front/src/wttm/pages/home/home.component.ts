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
import { Component, inject, signal } from '@angular/core'
import { Router } from '@angular/router'
import { PageShellComponent } from '../../components/page-shell/page-shell.component'
import { CreateGameComponent } from '../../components/create-game/create-game.component'
import { GameListComponent } from '../../components/game-list/game-list.component'
import { JoinGameComponent, JoinRequest } from '../../components/join-game/join-game.component'
import { GameService, JoinError } from '../../services/game.service'
import { Game } from '../../model/game-model'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'wttm-home',
  imports: [PageShellComponent, CreateGameComponent, GameListComponent, JoinGameComponent],
  template: `
    <wttm-page-shell>
      @if (joining(); as game) {
        <wttm-join-game [game]="game" [error]="joinError()"
                        (joined)="onJoinConfirmed($event)" (cancelled)="joining.set(null)" />
      }
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
  protected readonly joining = signal<Game | null>(null)
  protected readonly joinError = signal('')

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
    this.joinError.set('')
    this.joining.set(game)
  }

  protected async onJoinConfirmed(request: JoinRequest): Promise<void> {
    const game = this.joining()
    if (!game) {
      return
    }
    try {
      await this.gameService.joinGame(game, request.name, request.password)
      this.joining.set(null)
      await this.router.navigate(['/game', game.id])
    } catch (error) {
      if (error instanceof JoinError) {
        this.joinError.set(error.reason === 'wrong-password' ? 'Mot de passe incorrect.' : 'La partie est complète ou déjà lancée.')
      } else {
        console.error('Impossible de rejoindre la partie', error)
        this.joinError.set('Impossible de rejoindre la partie.')
      }
    }
  }
}
