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
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CardModel, CardType } from '../../model/card-model';

@Component({
  selector: 'wttm-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  // TODO : passer a signal
  @Input() $card!: Observable<CardModel>
  @Input() side: boolean = true

  imageUrl: string | null = null;

  constructor() {
  }

  ngOnInit(): void {
    this.$card.subscribe(card => {
      console.debug(card)
      if (card)  {
        this.imageUrl = `'${this.imageResourceFromCardType(card.cardType, this.side)}'`;
      }
    })
  }

  imageResourceFromCardType(cardType: CardType, side: boolean): string {
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
