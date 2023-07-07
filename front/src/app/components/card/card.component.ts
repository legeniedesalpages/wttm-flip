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

@Component({
  selector: 'wttm-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  too = "assets/images/cosmonaute.png"

  constructor() {
  }

  ngOnInit(): void {
  }
}
