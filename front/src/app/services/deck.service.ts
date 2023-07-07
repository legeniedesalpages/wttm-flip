/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 07/07/2023 - 19:14:52
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/07/2023
    * - Author          : renau
    * - Modification    : 
**/
import { Injectable, OnInit } from '@angular/core';
import { CardLogo, CardModel, CardType } from '../model/card-model';

@Injectable({
    providedIn: 'root'
})
export class DeckService implements OnInit {

    private deck: CardModel[] = []

    constructor() {
        this.deck.push(
            { id: 1, cardType: CardType.Robot, cardLogo: CardLogo.Comet, displayNumber: 1 },
            { id: 2, cardType: CardType.Electricty, cardLogo: CardLogo.Comet, displayNumber: 1 }
        )
    }

    ngOnInit(): void {

    }
}
