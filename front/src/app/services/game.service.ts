import { Injectable } from "@angular/core";
import { Card } from "../models/card";
import { CardsService } from "./cards.service";

@Injectable({ providedIn: 'root' })
export class GameService {


    decks: Card[][] = [];
    cardList: Card[] = [];
    shuffledDeck: Card[] = [];


    constructor(private cardsService: CardsService) {
    }


    startGame() {

        this.cardList = this.cardsService.getCardsList()
        console.debug("original cardlist " , this.cardList);

        this.shuffle(this.cardList)

        //this.splitDeck()

        console.log("celuila",this.decks)

    }

    nextTurn() {

    }

    private shuffle(cards: Card[]) {

        
        for (let i = 0; i < 10; i++) {
            cards.sort(() => Math.random() - 0.5);
        }

        console.log("after" , cards);
    }

    private splitDeck() {
        this.decks[0] = this.shuffledDeck.slice(0,20)
        this.decks[1] = this.shuffledDeck.slice(21, 41)
        this.decks[2] = this.shuffledDeck.slice(42, 62)
    }



}