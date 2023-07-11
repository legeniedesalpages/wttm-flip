import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from 'src/app/models/card';

@Component({
  selector: 'app-card-recto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-recto.component.html',
  styleUrls: ['./card-recto.component.scss']
})
export class CardRectoComponent {

  @Input()  card? : Card 

}
