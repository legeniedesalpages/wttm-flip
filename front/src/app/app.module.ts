/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 07/07/2023 - 08:21:26
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/07/2023
    * - Author          : renau
    * - Modification    : 
**/
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CardsService } from './services/cards.service';
import { GameService } from './services/game.service';
import { BannerComponent } from './components/banner/banner.component';
import { BoardComponent } from './components/board/board.component';


@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    BannerComponent,
    BoardComponent
  ],

  providers: [
    CardsService,
    GameService

  ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}