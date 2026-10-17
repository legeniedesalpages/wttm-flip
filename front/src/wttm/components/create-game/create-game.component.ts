/**
 * Create Game component for WTTM Flip Cards application
 * Handles game name input; the game details are asked on the next page
 */
import { Component, computed, input, output, signal } from '@angular/core'
import { form, FormField, required, maxLength } from '@angular/forms/signals'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { isSameName } from '../../services/game.service'

@Component({
  selector: 'wttm-create-game',
  imports: [FormField, MatInputModule, MatFormFieldModule, MatButtonModule],
  template: `
    <form class="input-container" (submit)="createGame($event)">
      <mat-form-field appearance="outline" class="name-field">
        <mat-label>Entrez votre nom pour créer une partie...</mat-label>
        <input matInput [formField]="gameForm.name" />
      </mat-form-field>

      <button matButton="filled" class="create-game-button" type="submit"
              [disabled]="gameForm.name().invalid() || nameTaken()">
        Créer la partie
      </button>

      @if (nameTaken()) {
        <p class="name-taken" role="alert">Une partie en cours ou en préparation porte déjà ce nom.</p>
      }

      <div class="separator"></div>
    </form>
  `,
  styleUrl: './create-game.component.css'
})
export class CreateGameComponent {
  private readonly model = signal({ name: '' })

  protected readonly gameForm = form(this.model, path => {
    required(path.name)
    maxLength(path.name, 30)
  })

  readonly existingNames = input<string[]>([])

  protected readonly nameTaken = computed(() => {
    const name = this.model().name
    return name.trim() !== '' && this.existingNames().some(existing => isSameName(existing, name))
  })

  readonly gameCreated = output<string>()

  protected createGame(event: Event): void {
    event.preventDefault()
    const name = this.model().name.trim()
    if (name && !this.nameTaken()) {
      this.gameCreated.emit(name)
      this.model.set({ name: '' })
    }
  }
}
