/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 07/07/2023 - 08:23:03
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/07/2023
    * - Author          : renau
    * - Modification    : 
**/
import { Component, OnInit } from '@angular/core';
import { PusherService } from './pusher.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      Hello World 2
    </div>
  `,
  styles: [``]
})
export class AppComponent implements OnInit {

  constructor(private pusherService: PusherService) {
    console.debug("Creating 'WTTM Flipcard'");
  }
  ngOnInit(): void {
    console.info("Launching 'WTTM Flipcard'")
    this.pusherService.channel.bind('my-event', (data: any) => {

      console.log(data)

    });
  }
}
