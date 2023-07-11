import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardRectoComponent } from '../card-recto/card-recto.component';
import { CardVersoComponent } from '../card-verso/card-verso.component';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule,CardRectoComponent,CardVersoComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

  constructor(public gameService: GameService){
  }

}
