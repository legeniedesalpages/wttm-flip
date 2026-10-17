/**
 * Join Game component: asks the player name (and the password when the game is protected)
 */
import { Component, input, output, signal } from '@angular/core'
import { form, FormField, maxLength, required } from '@angular/forms/signals'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { Game } from '../../model/game-model'

export interface JoinRequest {
  name: string
  password: string
}

@Component({
  selector: 'wttm-join-game',
  imports: [FormField, MatInputModule, MatFormFieldModule, MatButtonModule],
  template: `
    <form class="join-form" (submit)="join($event)">
      <h2>Rejoindre « {{ game().name }} »</h2>

      <mat-form-field appearance="outline">
        <mat-label>Votre pseudo</mat-label>
        <input matInput [formField]="joinForm.name" />
      </mat-form-field>

      @if (game().hasPassword) {
        <mat-form-field appearance="outline">
          <mat-label>Mot de passe</mat-label>
          <input matInput type="password" autocomplete="off" [formField]="joinForm.password" />
        </mat-form-field>
      }

      @if (error()) {
        <p class="error" role="alert">{{ error() }}</p>
      }

      <div class="actions">
        <button matButton="outlined" type="button" (click)="cancelled.emit()">Annuler</button>
        <button matButton="filled" type="submit" [disabled]="joinForm().invalid()">Rejoindre</button>
      </div>
    </form>
  `,
  styles: `
    .join-form {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 21em;
      margin: 0 auto;
    }

    h2 {
      margin: 0 0 1rem;
      font-size: 1.1rem;
    }

    .error {
      margin: 0 0 1rem;
      color: #b3261e;
    }

    .actions {
      display: flex;
      justify-content: space-between;
    }
  `
})
export class JoinGameComponent {
  readonly game = input.required<Game>()
  readonly error = input('')

  readonly joined = output<JoinRequest>()
  readonly cancelled = output()

  private readonly model = signal({ name: '', password: '' })

  protected readonly joinForm = form(this.model, path => {
    required(path.name)
    maxLength(path.name, 30)
  })

  protected join(event: Event): void {
    event.preventDefault()
    const { name, password } = this.model()
    if (name.trim()) {
      this.joined.emit({ name: name.trim(), password })
    }
  }
}
