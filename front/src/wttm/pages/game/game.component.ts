/**
 * Game page for WTTM Flip Cards application
 * Chooses between the common (local) and distributed (Firebase) game according to the game mode
 */
import { Component, computed, ElementRef, inject, input, resource, viewChild } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { FirebaseService } from '../../services/firebase.service'
import { Game } from '../../model/game-model'
import { GameService } from '../../services/game.service'
import { LocalGameComponent } from '../../components/local-game/local-game.component'
import { OnlineGameComponent } from '../../components/online-game/online-game.component'

@Component({
  selector: 'wttm-game',
  imports: [LocalGameComponent, OnlineGameComponent, RouterLink],
  template: `
    @if (game.value(); as game) {
      @if (game.mode === 'distributed') {
        <wttm-online-game [gameId]="game.id" />
      } @else {
        <wttm-local-game />
      }
      @if (isHost()) {
        <button type="button" class="stop" (click)="confirmDialog().nativeElement.showModal()">Terminer la partie</button>
        <dialog #confirm class="confirm" aria-labelledby="confirm-title">
          <form method="dialog">
            <h2 id="confirm-title">Terminer la partie ?</h2>
            <p>{{ game.mode === 'distributed' ? 'La partie sera terminée pour tous les joueurs.' : 'La partie sera supprimée.' }}</p>
            <div class="actions">
              <button value="cancel">Continuer à jouer</button>
              <button type="button" class="danger" (click)="stop(game)">Terminer la partie</button>
            </div>
          </form>
        </dialog>
      }
    } @else if (!game.isLoading()) {
      <section class="message">
        <p>Cette partie est introuvable.</p>
        <a routerLink="/">Retour à l'accueil</a>
      </section>
    }
  `,
  styleUrl: './game.component.css'
})
export class GameComponent {
  readonly id = input.required<string>()

  private readonly gameService = inject(GameService)
  private readonly firebase = inject(FirebaseService)
  private readonly router = inject(Router)

  protected readonly confirmDialog = viewChild.required<ElementRef<HTMLDialogElement>>('confirm')

  protected readonly game = resource({
    params: () => this.id(),
    loader: ({ params }) => this.gameService.getGame(params)
  })

  protected readonly isHost = computed(() => {
    const game = this.game.value()
    return !!game && game.hostUid === this.firebase.uid()
  })

  protected async stop(game: Game): Promise<void> {
    try {
      if (game.mode === 'distributed') {
        await this.gameService.finishGame(game.id)
        await this.router.navigate(['/summary', game.id])
      } else {
        await this.gameService.deleteGame(game.id)
        await this.router.navigateByUrl('/')
      }
    } catch (error) {
      console.error('Impossible de terminer la partie', error)
    }
  }
}
