import { Injectable } from "@angular/core";
import { Card, CardType } from "../models/card";


@Injectable({ providedIn: 'root' })
export class CardsService {

    private cardsList: Card[]


    constructor() {
        this.cardsList = [
            { id: 1, cardType: CardType.Robot, displayNumber: 1 },
            { id: 2, cardType: CardType.Electricity, displayNumber: 1 },
            { id: 3, cardType: CardType.Robot, displayNumber: 2 },
            { id: 4, cardType: CardType.Leaf, displayNumber: 2 },
            { id: 5, cardType: CardType.Water, displayNumber: 3 },
            { id: 6, cardType: CardType.Spaceman, displayNumber: 3 },
            { id: 7, cardType: CardType.Planning, displayNumber: 3 },
            { id: 8, cardType: CardType.Electricity, displayNumber: 4 },
            { id: 9, cardType: CardType.Leaf, displayNumber: 4 },
            { id: 10, cardType: CardType.Spaceman, displayNumber: 4 },
            { id: 11, cardType: CardType.Planning, displayNumber: 4 },
            { id: 12, cardType: CardType.Robot, displayNumber: 5 },
            { id: 13, cardType: CardType.Robot, displayNumber: 5 },
            { id: 14, cardType: CardType.Electricity, displayNumber: 5 },
            { id: 15, cardType: CardType.Electricity, displayNumber: 5 },
            { id: 16, cardType: CardType.Leaf, displayNumber: 5 },
            { id: 17, cardType: CardType.Robot, displayNumber: 6 },
            { id: 18, cardType: CardType.Electricity, displayNumber: 6 },
            { id: 19, cardType: CardType.Leaf, displayNumber: 6 },
            { id: 20, cardType: CardType.Water, displayNumber: 6 },
            { id: 21, cardType: CardType.Spaceman, displayNumber: 6 },
            { id: 22, cardType: CardType.Planning, displayNumber: 6 },
            { id: 23, cardType: CardType.Robot, displayNumber: 7 },
            { id: 24, cardType: CardType.Electricity, displayNumber: 7 },
            { id: 25, cardType: CardType.Electricity, displayNumber: 7 },
            { id: 26, cardType: CardType.Leaf, displayNumber: 7 },
            { id: 27, cardType: CardType.Leaf, displayNumber: 7 },
            { id: 28, cardType: CardType.Water, displayNumber: 7 },
            { id: 29, cardType: CardType.Robot, displayNumber: 8 },
            { id: 30, cardType: CardType.Robot, displayNumber: 8 },
            { id: 31, cardType: CardType.Leaf, displayNumber: 8 },
            { id: 32, cardType: CardType.Leaf, displayNumber: 8 },
            { id: 33, cardType: CardType.Water, displayNumber: 8 },
            { id: 34, cardType: CardType.Spaceman, displayNumber: 8 },
            { id: 35, cardType: CardType.Planning, displayNumber: 8 },
            { id: 36, cardType: CardType.Robot, displayNumber: 9 },
            { id: 37, cardType: CardType.Electricity, displayNumber: 9 },
            { id: 38, cardType: CardType.Electricity, displayNumber: 9 },
            { id: 39, cardType: CardType.Leaf, displayNumber: 9 },
            { id: 40, cardType: CardType.Leaf, displayNumber: 9 },
            { id: 41, cardType: CardType.Water, displayNumber: 9 },
            { id: 42, cardType: CardType.Robot, displayNumber: 10 },
            { id: 43, cardType: CardType.Electricity, displayNumber: 10 },
            { id: 44, cardType: CardType.Leaf, displayNumber: 10 },
            { id: 45, cardType: CardType.Water, displayNumber: 10 },
            { id: 46, cardType: CardType.Spaceman, displayNumber: 10 },
            { id: 47, cardType: CardType.Planning, displayNumber: 10 },
            { id: 48, cardType: CardType.Robot, displayNumber: 11 },
            { id: 49, cardType: CardType.Robot, displayNumber: 11 },
            { id: 50, cardType: CardType.Electricity, displayNumber: 11 },
            { id: 51, cardType: CardType.Electricity, displayNumber: 11 },
            { id: 52, cardType: CardType.Leaf, displayNumber: 11 },
            { id: 53, cardType: CardType.Electricity, displayNumber: 12 },
            { id: 54, cardType: CardType.Leaf, displayNumber: 12 },
            { id: 55, cardType: CardType.Spaceman, displayNumber: 12 },
            { id: 56, cardType: CardType.Planning, displayNumber: 12 },
            { id: 57, cardType: CardType.Water, displayNumber: 13 },
            { id: 58, cardType: CardType.Spaceman, displayNumber: 13 },
            { id: 59, cardType: CardType.Planning, displayNumber: 13 },
            { id: 60, cardType: CardType.Robot, displayNumber: 14 },
            { id: 61, cardType: CardType.Leaf, displayNumber: 14 },
            { id: 62, cardType: CardType.Robot, displayNumber: 15 },
            { id: 63, cardType: CardType.Electricity, displayNumber: 15 }



        ]
console.log("toto",this.cardsList)

    }

    getCardsList() {
        console.log("toto 1",this.cardsList)
        let a =  this.cardsList.slice()
        console.log("toto 2",a)
        new Promise((r) => setTimeout(r,500)).then(()=> {}).catch() 
        return a

    }

    
}

