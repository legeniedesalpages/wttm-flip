/**
 * Game page for WTTM Flip Cards application
 * Displays the top card of each of the three decks
 */
import { Component, inject } from '@angular/core'
import { CardComponent } from '../../components/card/card.component'
import { DeckService } from '../../services/deck.service'

@Component({
  selector: 'wttm-game',
  imports: [CardComponent],
  template: `
    <main class="table">
      @for (card of topCards(); track card.id) {
        <wttm-card class="deck" [card]="card" />
      }
    </main>
  `,
  styleUrl: './game.component.css'
})
export class GameComponent {
  private readonly deckService = inject(DeckService)

  protected readonly topCards = this.deckService.topCards

  constructor() {
    this.deckService.initGame()
  }
}
