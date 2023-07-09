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
import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { CardModel } from 'src/app/model/card-model';
import { DeckService } from 'src/app/services/deck.service';

@Component({
  selector: 'wttm-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  cards: Observable<CardModel>[] = []
  side: boolean = true

  constructor(private deckService: DeckService) {
    this.cards = deckService.getCards()
  }

  ngOnInit(): void {
    this.deckService.firstShuffle()
  }

  next() {
    this.deckService.incrementRound()
  }
}
