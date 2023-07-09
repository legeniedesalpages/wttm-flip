/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 07/07/2023 - 17:39:02
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/07/2023
    * - Author          : renau
    * - Modification    : 
**/
import { NgModule } from '@angular/core';
import { BoardComponent } from './board.component';
import { CommonModule } from '@angular/common';
import { CardModule } from '../card/card.module';
import { DeckService } from 'src/app/services/deck.service';

@NgModule({
  declarations: [BoardComponent],
  exports: [BoardComponent],

  imports: [
    CommonModule,
    CardModule
  ],

  providers: [
    DeckService
  ]

})
export class BoardModule { }
