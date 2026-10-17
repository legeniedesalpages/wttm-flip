/**
 * Mode distribué : l'hôte pilote la partie, les cartes sont retournées quand tous les joueurs ont joué
 */
import { Component, computed, effect, inject, input } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { DeckService } from '../../services/deck.service'
import { OnlineGameService } from '../../services/online-game.service'
import { DelayedButtonComponent } from '../delayed-button/delayed-button.component'
import { TableComponent } from '../table/table.component'

@Component({
  selector: 'wttm-online-game',
  imports: [TableComponent, DelayedButtonComponent, RouterLink],
  template: `
    @if (online.error(); as error) {
      <section class="message">
        <p>{{ error }}</p>
        <a routerLink="/">Retour à l'accueil</a>
      </section>
    } @else if (online.loaded() && !online.game()) {
      <section class="message">
        <p>La partie a été arrêtée.</p>
        <a routerLink="/">Retour à l'accueil</a>
      </section>
    } @else if (online.game(); as game) {
      @if (game.status === 'finished') {
        <section class="message"><p>La partie est terminée…</p></section>
      } @else if (game.status === 'waiting') {
        <section class="message">
          <h1>{{ game.name }}</h1>
          <p>En attente des joueurs : {{ online.players().length }} / {{ game.maxPlayers }}</p>
          <ul>
            @for (player of online.players(); track player.uid) {
              <li>{{ player.name }}</li>
            }
          </ul>
          @if (online.isHost()) {
            <button type="button" [disabled]="online.players().length < 2" (click)="online.start()">
              Lancer maintenant
            </button>
          } @else {
            <p>La partie démarrera dès que l'hôte la lancera.</p>
          }
        </section>
      } @else {
        <wttm-table [deckTops]="deckService.deckTops()" [remaining]="deckService.remaining()" [discardTops]="deckService.discardTops()">
          @if (deckService.allDrawn()) {
            @if (online.isHost()) {
              <wttm-delayed-button [lockKey]="lockKey()" (pressed)="online.flip()">Mélanger</wttm-delayed-button>
            } @else {
              <p>En attente du mélange par l'hôte…</p>
            }
          } @else {
            <wttm-delayed-button [lockKey]="lockKey()" [disabled]="online.me()?.ready ?? false" (pressed)="online.markReady()">{{ readyLabel() }}</wttm-delayed-button>
            <p>{{ status() }}</p>
          }
        </wttm-table>
      }
    }
  `,
  styleUrl: './online-game.component.css'
})
export class OnlineGameComponent {
  readonly gameId = input.required<string>()

  private readonly router = inject(Router)
  protected readonly online = inject(OnlineGameService)
  protected readonly deckService = inject(DeckService)

  protected readonly lockKey = computed(() => this.deckService.remaining().join())

  protected readonly firstRound = computed(() => this.deckService.discardTops().every(card => !card))

  protected readonly readyLabel = computed(() => this.firstRound() ? 'Je suis prêt' : "J'ai joué")

  protected readonly status = computed(() => {
    const waiting = this.online.waitingFor()
    return waiting.length === 0 ? '' : 'En attente de : ' + waiting.map(player => player.name).join(', ')
  })

  constructor() {
    effect(() => {
      const game = this.online.game()
      if (game?.status === 'finished' && game.id === this.gameId()) {
        void this.router.navigate(['/summary', this.gameId()])
      }
    })
    effect(onCleanup => {
      const stop = this.online.connect(this.gameId())
      onCleanup(stop)
    })
  }
}
