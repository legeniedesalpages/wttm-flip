import { Injectable } from "@angular/core";
import { Card } from "../models/card";
import { CardsService } from "./cards.service";

@Injectable({ providedIn: 'root' })
export class GameService {


    decks: Card[][] = []
    indexTurn: number = 1

    cardBoard: Card[][] = []



    constructor(private cardsService: CardsService) {
    }


    startGame() {

        let cardList = this.cardsService.getCardsList()
        console.debug("original cardlist ", cardList);

        this.shuffle(cardList)

        this.splitDeck(cardList)

        this.cardBoard = [
            [this.decks[0][this.indexTurn - 1], this.decks[0][this.indexTurn]],
            [this.decks[1][this.indexTurn - 1], this.decks[1][this.indexTurn]],
            [this.decks[2][this.indexTurn - 1], this.decks[2][this.indexTurn]]
        ]

        console.log("celuila", this.decks)

    }

    nextTurn() {
        this.indexTurn++
        if (this.indexTurn == 21) {
            this.indexTurn = 1
            for (let i = 0; i < 2; i++) {
                this.shuffle(this.decks[i])
            }
        }
        console.log(this.indexTurn)

        this.cardBoard = [
            [this.decks[0][this.indexTurn - 1], this.decks[0][this.indexTurn]],
            [this.decks[1][this.indexTurn - 1], this.decks[1][this.indexTurn]],
            [this.decks[2][this.indexTurn - 1], this.decks[2][this.indexTurn]]
        ]

    }

    private shuffle(cards: Card[]) {


        for (let i = 0; i < 10; i++) {
            cards.sort(() => Math.random() - 0.5);
        }

        console.log("after", cards);
    }

    private splitDeck(cards: Card[]) {
        this.decks[0] = cards.slice(0, 21)
        this.decks[1] = cards.slice(21, 42)
        this.decks[2] = cards.slice(42, 63)
    }

    public getIndexTurn(): Number {
        return this.indexTurn
    }

    getCardsForTurn(): Card[][] {



 

        return this.cardBoard

    }

}