import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, CardType } from 'src/app/models/card';

@Component({
  selector: 'app-card-recto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-recto.component.html',
  styleUrls: ['./card-recto.component.css']
})
export class CardRectoComponent {

  @Input()  card? : Card 

  public imageRessourceFromCardType(cardtype? : CardType){
    let image 
    switch ( cardtype) {
      case CardType.Electricity : 
      image = "electricity_recto"
      break
      case CardType.Leaf : 
      image = "leaf_recto"
      break
      case CardType.Planning : 
      image = "planning_recto"
      break
      case CardType.Robot : 
      image = "robot_recto"
      break
      case CardType.Spaceman : 
      image = "spaceman_recto"
      break
      case CardType.Water : 
      image = "water_recto"
      break

      

    }
    return "assets/images/" + image + ".png"

  }

}
