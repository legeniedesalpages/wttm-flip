/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 07/07/2023 - 17:40:18
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/07/2023
    * - Author          : renau
    * - Modification    : 
**/
import { Component, ChangeDetectionStrategy, computed, input } from '@angular/core'
import { CardModel, CardType } from '../../model/card-model'

@Component({
  selector: 'wttm-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {

  readonly card = input.required<CardModel>()
  readonly side = input(true)

  protected readonly imageUrl = computed(() => `url('${this.imageResourceFromCardType(this.card().cardType, this.side())}')`)

  private imageResourceFromCardType(cardType: CardType, side: boolean): string {
    let image: string
    switch (cardType) {
      case CardType.Robot:
        image = "robot"
        break
      case CardType.Electricity:
        image = "electricity"
        break
      case CardType.Leaf:
        image = "leaf"
        break
      case CardType.Water:
        image = "water"
        break
      case CardType.Spaceman:
        image = "spaceman"
        break
      case CardType.Planning:
        image = "planning"
        break
      default:
        throw Error('Invalid card type')
    }
    return "assets/images/" + image + (side ? '_recto' : '') + ".png"
  }
}
