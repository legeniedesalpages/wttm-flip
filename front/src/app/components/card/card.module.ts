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
import { CardComponent } from './card.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule
  ],
  exports: [CardComponent]
})
export class CardModule { }
