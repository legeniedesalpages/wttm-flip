import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, CardType } from 'src/app/models/card';

@Component({
  selector: 'app-card-verso',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-verso.component.html',
  styleUrls: ['./card-verso.component.css']
})
export class CardVersoComponent {

  @Input()  card? : Card 

  public imageRessourceFromCardType(cardtype? : CardType){
    let image 
    switch ( cardtype) {
      case CardType.Electricity : 
      image = "electricity"
      break
      case CardType.Leaf : 
      image = "leaf"
      break
      case CardType.Planning : 
      image = "planning"
      break
      case CardType.Robot : 
      image = "robot"
      break
      case CardType.Spaceman : 
      image = "spaceman"
      break
      case CardType.Water : 
      image = "water"
      break

      

    }
    return "assets/images/" + image + ".png"

  }

}
