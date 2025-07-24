/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 24/07/2025 - 12:14:17
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 24/07/2025
    * - Author          : renau
    * - Modification    : 
**/
/**
 * Create Game component for WTTM Flip Cards application
 * Handles player name input and game creation
 */
import { Component, ChangeDetectionStrategy, signal, output } from '@angular/core'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'wttm-create-game',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule],
  templateUrl: './create-game.component.html',
  styleUrl: './create-game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateGameComponent {
  protected readonly playerName = signal('')
  protected readonly gameCreated = output<string>()
  
  protected onNameChange(name: string): void {
    this.playerName.set(name)
  }

  protected createGame(): void {
    const name = this.playerName()?.trim()
    if (name) {
      console.debug('Création de la partie pour:', name)
      this.gameCreated.emit(name)
    }
  }
}
