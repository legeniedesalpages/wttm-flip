/**
 * Game page for WTTM Flip Cards application
 * Three decks: face-down piles on top, flipped cards below
 */
import { Component, computed, inject } from '@angular/core'
import { CardComponent } from '../../components/card/card.component'
import { DeckService } from '../../services/deck.service'

@Component({
  selector: 'wttm-game',
  imports: [CardComponent],
  template: `
    <main class="table">
      @for (card of deckTops(); track $index) {
        @if (card) {
          <wttm-card class="slot" [card]="card" [side]="false" />
        } @else {
          <div class="slot empty"></div>
        }
      }
      <button type="button" class="flip" (click)="flip()">
        {{ allFlipped() ? 'Mélanger' : 'Retourner' }}
      </button>
      @for (card of discardTops(); track $index) {
        @if (card) {
          <wttm-card class="slot" [card]="card" />
        } @else {
          <div class="slot empty"></div>
        }
      }
    </main>
  `,
  styleUrl: './game.component.css'
})
export class GameComponent {
  private readonly deckService = inject(DeckService)

  protected readonly deckTops = this.deckService.deckTops
  protected readonly discardTops = this.deckService.discardTops
  protected readonly allFlipped = computed(() => this.deckService.remaining().every(count => count === 0))

  constructor() {
    this.deckService.initGame()
  }

  protected flip() {
    this.deckService.flip()
  }
}
