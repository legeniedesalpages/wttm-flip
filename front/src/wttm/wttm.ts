/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 23/07/2025 - 22:42:48
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 23/07/2025
    * - Author          : renau
    * - Modification    : 
**/
/**
 * Main application component for WTTM Flip Cards
 */
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'wttm-root',
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
  styles: `
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Wttm {
}
