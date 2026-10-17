/**
 * Join game page: asks the player name (and the password when the game is protected)
 */
import { Component, inject, input, resource, signal } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { form, FormField, maxLength, required } from '@angular/forms/signals'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { PageShellComponent } from '../../components/page-shell/page-shell.component'
import { GameService, JoinError } from '../../services/game.service'

@Component({
  selector: 'wttm-join-game',
  imports: [FormField, RouterLink, MatInputModule, MatFormFieldModule, MatButtonModule, PageShellComponent],
  template: `
    <wttm-page-shell>
      <form class="details" (submit)="join($event)">
        @if (game.value(); as game) {
          <h2 class="game-name">{{ game.name }}</h2>

          <mat-form-field appearance="outline" class="field">
            <mat-label>Votre pseudo</mat-label>
            <input matInput [formField]="joinForm.name" />
          </mat-form-field>

          @if (game.hasPassword) {
            <mat-form-field appearance="outline" class="field">
              <mat-label>Mot de passe</mat-label>
              <input matInput type="password" autocomplete="off" [formField]="joinForm.password" />
            </mat-form-field>
          }

          @if (error()) {
            <p class="error" role="alert">{{ error() }}</p>
          }

          <button matButton="filled" class="join-button" type="submit"
                  [disabled]="joinForm.name().invalid() || joining()">
            Rejoindre
          </button>
        } @else if (!game.isLoading()) {
          <p class="error" role="alert">Cette partie est introuvable.</p>
        }
        <a matButton="outlined" class="cancel-button" routerLink="/">Annuler</a>
      </form>
    </wttm-page-shell>
  `,
  styleUrl: './join-game.component.css'
})
export class JoinGameComponent {
  readonly id = input.required<string>()

  private readonly gameService = inject(GameService)
  private readonly router = inject(Router)

  protected readonly game = resource({
    params: () => this.id(),
    loader: ({ params }) => this.gameService.getGame(params)
  })

  protected readonly joining = signal(false)
  protected readonly error = signal('')

  private readonly model = signal({ name: '', password: '' })

  protected readonly joinForm = form(this.model, path => {
    required(path.name)
    maxLength(path.name, 30)
  })

  protected async join(event: Event): Promise<void> {
    event.preventDefault()
    const game = this.game.value()
    const { name, password } = this.model()
    if (!game || !name.trim() || this.joining()) {
      return
    }
    this.joining.set(true)
    this.error.set('')
    try {
      await this.gameService.joinGame(game, name.trim(), password)
      await this.router.navigate(['/game', game.id])
    } catch (error) {
      if (error instanceof JoinError) {
        this.error.set(error.reason === 'wrong-password' ? 'Mot de passe incorrect.' : 'La partie est complète ou déjà lancée.')
      } else {
        console.error('Impossible de rejoindre la partie', error)
        this.error.set('Impossible de rejoindre la partie.')
      }
    } finally {
      this.joining.set(false)
    }
  }
}
