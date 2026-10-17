/**
 * Game page for WTTM Flip Cards application
 * Chooses between the common (local) and distributed (Firebase) game according to the game mode
 */
import { Component, computed, ElementRef, inject, input, resource, viewChild } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { FirebaseService } from '../../services/firebase.service'
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
        <button type="button" class="stop" (click)="confirmDialog().nativeElement.showModal()">Arrêter la partie</button>
        <dialog #confirm class="confirm" aria-labelledby="confirm-title">
          <form method="dialog">
            <h2 id="confirm-title">Arrêter la partie ?</h2>
            <p>La partie sera supprimée pour tous les joueurs.</p>
            <div class="actions">
              <button value="cancel">Continuer à jouer</button>
              <button type="button" class="danger" (click)="stop(game.id)">Arrêter la partie</button>
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

  protected async stop(id: string): Promise<void> {
    try {
      await this.gameService.deleteGame(id)
      await this.router.navigateByUrl('/')
    } catch (error) {
      console.error('Impossible d\'arrêter la partie', error)
    }
  }
}
