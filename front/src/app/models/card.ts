export interface Card {
    id : number;
    cardType : CardType;
    displayNumber : number 
}

export enum CardType {
    Electricity,
    Leaf,
    Planning,
    Robot,
    Spaceman,
    Water
}

