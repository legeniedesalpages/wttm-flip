/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 07/07/2023 - 19:46:58
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/07/2023
    * - Author          : renau
    * - Modification    : 
**/
export interface CardModel {
    id: number
    cardType: CardType
    cardLogo: CardLogo
    displayNumber: number
}

export enum CardType {
    Robot,
    Electricity,
    Leaf,
    Water,
    Spaceman,
    Planning
}

export enum CardLogo {
    Earth,
    BlackHole,
    Apollo,
    Asteroids,
    Firefly,
    MilkyWay,
    Jupiter,
    StarTrek,
    Moon,
    Cat,
    Sun,
    Space,
    Encelade,
    Dog,
    Comet
}

export enum Side {
    NumberSide,
    TypeSide
}