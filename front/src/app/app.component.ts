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
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      Hello World 2
    </div>
  `,
  styles: [``]
})
export class AppComponent {

  constructor() {
    console.info("Launching 'WTTM Flipcard'");
  }
}
