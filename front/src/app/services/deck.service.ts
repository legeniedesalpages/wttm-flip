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
import { Injectable } from '@angular/core';
import { CardLogo, CardModel, CardType } from '../model/card-model';
import { Observable, Subject, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeckService {

    private static NUMBER_OF_DECK: number = 3
    private static NUMBER_OF_SHUFFLE: number = 10

    private cardList: CardModel[] = []
    private deck: CardModel[][] = []
    private round: number = 0
    private subjects: Subject<CardModel>[] = []

    constructor() {
        this.createCards()
        console.info("Cards created, number of cards: " + this.cardList.length)
    }


    public firstShuffle() {
        const clonedCardList = [...this.cardList]
        for (let i = 0; i < DeckService.NUMBER_OF_SHUFFLE; i++) {
            clonedCardList.sort(() => Math.random() - 0.5);
        }
        for (let i = 0; i < DeckService.NUMBER_OF_DECK; i++) {
            this.deck[i] = clonedCardList.splice(0, this.cardList.length / DeckService.NUMBER_OF_DECK)
        }
        this.round = 0
        console.debug("Deck: ", this.deck)
    }

    public getCards(): Observable<CardModel>[] {
        for(let i=0; i<6; i++) {
            this.subjects[i] = new Subject()
        }
        return this.subjects
    }

    public incrementRound() {
        this.round++
        console.log("Round:" + this.round)
        if (this.round == this.cardList.length / DeckService.NUMBER_OF_DECK) {
            this.shuffle()
            this.round = 0
        }
        for(let i=0; i<3; i++) {
            this.subjects[i].next(this.deck[i][this.round])
        }
        for(let i=3; i<6; i++) {
            this.subjects[i].next(this.deck[i-3][this.round+1])
        }
    }

    private shuffle() {
        for (let i = 0; i < DeckService.NUMBER_OF_DECK; i++) {
            this.deck[i].sort(() => Math.random() - 0.5);
        }
    }

    private createCards() {
        this.cardList.push(
            { id: 1, cardType: CardType.Robot, cardLogo: CardLogo.Comet, displayNumber: 1 },
            { id: 2, cardType: CardType.Electricty, cardLogo: CardLogo.Comet, displayNumber: 1 },
            { id: 3, cardType: CardType.Robot, cardLogo: CardLogo.Dog, displayNumber: 2 },
            { id: 4, cardType: CardType.Leaf, cardLogo: CardLogo.Dog, displayNumber: 2 },
            { id: 5, cardType: CardType.Water, cardLogo: CardLogo.Encelade, displayNumber: 3 },
            { id: 6, cardType: CardType.Spaceman, cardLogo: CardLogo.Encelade, displayNumber: 3 },
            { id: 7, cardType: CardType.Planning, cardLogo: CardLogo.Encelade, displayNumber: 3 },
            { id: 8, cardType: CardType.Electricty, cardLogo: CardLogo.Space, displayNumber: 4 },
            { id: 9, cardType: CardType.Leaf, cardLogo: CardLogo.Space, displayNumber: 4 },
            { id: 10, cardType: CardType.Spaceman, cardLogo: CardLogo.Space, displayNumber: 4 },
            { id: 11, cardType: CardType.Planning, cardLogo: CardLogo.Space, displayNumber: 4 },
            { id: 12, cardType: CardType.Robot, cardLogo: CardLogo.Sun, displayNumber: 5 },
            { id: 13, cardType: CardType.Robot, cardLogo: CardLogo.Sun, displayNumber: 5 },
            { id: 14, cardType: CardType.Electricty, cardLogo: CardLogo.Sun, displayNumber: 5 },
            { id: 15, cardType: CardType.Electricty, cardLogo: CardLogo.Sun, displayNumber: 5 },
            { id: 16, cardType: CardType.Leaf, cardLogo: CardLogo.Sun, displayNumber: 5 },
            { id: 17, cardType: CardType.Robot, cardLogo: CardLogo.Cat, displayNumber: 6 },
            { id: 18, cardType: CardType.Electricty, cardLogo: CardLogo.Cat, displayNumber: 6 },
            { id: 19, cardType: CardType.Leaf, cardLogo: CardLogo.Cat, displayNumber: 6 },
            { id: 20, cardType: CardType.Water, cardLogo: CardLogo.Cat, displayNumber: 6 },
            { id: 21, cardType: CardType.Spaceman, cardLogo: CardLogo.Cat, displayNumber: 6 },
            { id: 22, cardType: CardType.Planning, cardLogo: CardLogo.Cat, displayNumber: 6 },
            { id: 23, cardType: CardType.Robot, cardLogo: CardLogo.Moon, displayNumber: 7 },
            { id: 24, cardType: CardType.Electricty, cardLogo: CardLogo.Moon, displayNumber: 7 },
            { id: 25, cardType: CardType.Electricty, cardLogo: CardLogo.Moon, displayNumber: 7 },
            { id: 26, cardType: CardType.Leaf, cardLogo: CardLogo.Moon, displayNumber: 7 },
            { id: 27, cardType: CardType.Leaf, cardLogo: CardLogo.Moon, displayNumber: 7 },
            { id: 28, cardType: CardType.Water, cardLogo: CardLogo.Moon, displayNumber: 7 },
            { id: 29, cardType: CardType.Robot, cardLogo: CardLogo.StarTrek, displayNumber: 8 },
            { id: 30, cardType: CardType.Robot, cardLogo: CardLogo.StarTrek, displayNumber: 8 },
            { id: 31, cardType: CardType.Leaf, cardLogo: CardLogo.StarTrek, displayNumber: 8 },
            { id: 32, cardType: CardType.Leaf, cardLogo: CardLogo.StarTrek, displayNumber: 8 },
            { id: 33, cardType: CardType.Water, cardLogo: CardLogo.StarTrek, displayNumber: 8 },
            { id: 34, cardType: CardType.Spaceman, cardLogo: CardLogo.StarTrek, displayNumber: 8 },
            { id: 35, cardType: CardType.Planning, cardLogo: CardLogo.StarTrek, displayNumber: 8 },
            { id: 36, cardType: CardType.Robot, cardLogo: CardLogo.Jupiter, displayNumber: 9 },
            { id: 37, cardType: CardType.Electricty, cardLogo: CardLogo.Jupiter, displayNumber: 9 },
            { id: 38, cardType: CardType.Electricty, cardLogo: CardLogo.Jupiter, displayNumber: 9 },
            { id: 39, cardType: CardType.Leaf, cardLogo: CardLogo.Jupiter, displayNumber: 9 },
            { id: 40, cardType: CardType.Leaf, cardLogo: CardLogo.Jupiter, displayNumber: 9 },
            { id: 41, cardType: CardType.Water, cardLogo: CardLogo.Jupiter, displayNumber: 9 },
            { id: 42, cardType: CardType.Robot, cardLogo: CardLogo.MilkyWay, displayNumber: 10 },
            { id: 43, cardType: CardType.Electricty, cardLogo: CardLogo.MilkyWay, displayNumber: 10 },
            { id: 44, cardType: CardType.Leaf, cardLogo: CardLogo.MilkyWay, displayNumber: 10 },
            { id: 45, cardType: CardType.Water, cardLogo: CardLogo.MilkyWay, displayNumber: 10 },
            { id: 46, cardType: CardType.Spaceman, cardLogo: CardLogo.MilkyWay, displayNumber: 10 },
            { id: 47, cardType: CardType.Planning, cardLogo: CardLogo.MilkyWay, displayNumber: 10 },
            { id: 48, cardType: CardType.Robot, cardLogo: CardLogo.Firefly, displayNumber: 11 },
            { id: 49, cardType: CardType.Robot, cardLogo: CardLogo.Firefly, displayNumber: 11 },
            { id: 50, cardType: CardType.Electricty, cardLogo: CardLogo.Firefly, displayNumber: 11 },
            { id: 51, cardType: CardType.Electricty, cardLogo: CardLogo.Firefly, displayNumber: 11 },
            { id: 52, cardType: CardType.Leaf, cardLogo: CardLogo.Firefly, displayNumber: 11 },
            { id: 53, cardType: CardType.Electricty, cardLogo: CardLogo.Asteroids, displayNumber: 12 },
            { id: 54, cardType: CardType.Leaf, cardLogo: CardLogo.Asteroids, displayNumber: 12 },
            { id: 55, cardType: CardType.Spaceman, cardLogo: CardLogo.Asteroids, displayNumber: 12 },
            { id: 56, cardType: CardType.Planning, cardLogo: CardLogo.Asteroids, displayNumber: 12 },
            { id: 57, cardType: CardType.Water, cardLogo: CardLogo.Apollo, displayNumber: 13 },
            { id: 58, cardType: CardType.Spaceman, cardLogo: CardLogo.Apollo, displayNumber: 13 },
            { id: 59, cardType: CardType.Planning, cardLogo: CardLogo.Apollo, displayNumber: 13 },
            { id: 60, cardType: CardType.Robot, cardLogo: CardLogo.BlackHole, displayNumber: 14 },
            { id: 61, cardType: CardType.Leaf, cardLogo: CardLogo.BlackHole, displayNumber: 14 },
            { id: 62, cardType: CardType.Robot, cardLogo: CardLogo.Earth, displayNumber: 15 },
            { id: 63, cardType: CardType.Electricty, cardLogo: CardLogo.Earth, displayNumber: 15 }
        )
    }
}
