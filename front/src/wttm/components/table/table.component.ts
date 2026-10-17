/**
 * Table de jeu : 3 paquets face cachée, une zone de contrôles, puis les cartes retournées
 */
import { Component, input } from '@angular/core'
import { CardModel } from '../../model/card-model'
import { CardComponent } from '../card/card.component'

@Component({
  selector: 'wttm-table',
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
      <div class="controls">
        <ng-content />
      </div>
      @for (card of discardTops(); track $index) {
        @if (card) {
          <wttm-card class="slot" [card]="card" />
        } @else {
          <div class="slot empty"></div>
        }
      }
    </main>
  `,
  styleUrl: './table.component.css'
})
export class TableComponent {
  readonly deckTops = input.required<(CardModel | undefined)[]>()
  readonly discardTops = input.required<(CardModel | undefined)[]>()
}
