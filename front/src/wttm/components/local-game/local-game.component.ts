/**
 * Mode commun : chaque navigateur gère sa propre partie, sans synchronisation
 */
import { Component, inject } from '@angular/core'
import { DeckService } from '../../services/deck.service'
import { DelayedButtonComponent } from '../delayed-button/delayed-button.component'
import { TableComponent } from '../table/table.component'

@Component({
  selector: 'wttm-local-game',
  imports: [TableComponent, DelayedButtonComponent],
  template: `
    <wttm-table [deckTops]="deckService.deckTops()" [remaining]="deckService.remaining()" [discardTops]="deckService.discardTops()">
      <wttm-delayed-button [lockKey]="deckService.remaining().join()" (pressed)="deckService.flip()">
        {{ deckService.allDrawn() ? 'Mélanger' : 'Retourner' }}
      </wttm-delayed-button>
    </wttm-table>
  `
})
export class LocalGameComponent {
  protected readonly deckService = inject(DeckService)

  constructor() {
    this.deckService.initGame()
  }
}
