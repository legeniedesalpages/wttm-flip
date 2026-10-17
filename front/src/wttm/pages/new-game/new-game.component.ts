/**
 * New game page: asks the game details (mode, number of players, password) then creates the game
 */
import { Component, inject, input, signal } from '@angular/core'
import { Router, RouterLink } from '@angular/router'
import { form, FormField } from '@angular/forms/signals'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatButtonModule } from '@angular/material/button'
import { PageShellComponent } from '../../components/page-shell/page-shell.component'
import { GameService, NameTakenError } from '../../services/game.service'

@Component({
  selector: 'wttm-new-game',
  imports: [FormField, RouterLink, MatInputModule, MatFormFieldModule, MatButtonModule, PageShellComponent],
  template: `
    <wttm-page-shell>
      <form class="details" (submit)="create($event)">
        <h2 class="game-name">{{ name() }}</h2>

        @if (step() === 'mode') {
          <div class="choices" role="group" aria-label="Mode de jeu">
            <button matButton="filled" class="big" type="button" [disabled]="creating()" (click)="create()">
              Un seul écran
            </button>
            <button matButton="filled" class="big" type="button" [disabled]="creating()" (click)="step.set('distributed')">
              Chaque joueur sur son écran
            </button>
          </div>
        } @else {
          <div class="players" role="group" aria-label="Nombre de joueurs">
            <span class="label">Nombre de joueurs</span>
            <div class="count-buttons">
              @for (count of playerCounts; track count) {
                <button matButton="filled" type="button"
                        [class.unselected]="maxPlayers() !== count"
                        [attr.aria-pressed]="maxPlayers() === count"
                        (click)="maxPlayers.set(count)">
                  {{ count }}
                </button>
              }
            </div>
          </div>

          <mat-form-field appearance="outline" class="password">
            <mat-label>Mot de passe (facultatif)</mat-label>
            <input matInput type="password" autocomplete="off" [formField]="passwordForm.password" />
          </mat-form-field>
        }

        @if (error()) {
          <p class="error" role="alert">{{ error() }}</p>
        }

        @if (step() === 'distributed') {
          <button matButton="filled" class="create-game-button" type="submit" [disabled]="creating()">
            Créer la partie
          </button>
          <button matButton="outlined" class="cancel-button" type="button" (click)="step.set('mode')">Retour</button>
        } @else {
          <a matButton="outlined" class="cancel-button" routerLink="/">Annuler</a>
        }
      </form>
    </wttm-page-shell>
  `,
  styleUrl: './new-game.component.css'
})
export class NewGameComponent {
  readonly name = input('')

  private readonly gameService = inject(GameService)
  private readonly router = inject(Router)

  protected readonly playerCounts = [2, 3, 4, 5, 6]
  protected readonly step = signal<'mode' | 'distributed'>('mode')
  protected readonly maxPlayers = signal(2)
  protected readonly creating = signal(false)
  protected readonly error = signal('')

  private readonly passwordModel = signal({ password: '' })
  protected readonly passwordForm = form(this.passwordModel)

  protected async create(event?: Event): Promise<void> {
    event?.preventDefault()
    const name = this.name().trim()
    if (!name) {
      await this.router.navigateByUrl('/')
      return
    }
    this.creating.set(true)
    this.error.set('')
    try {
      const gameId = await this.gameService.createGame({
        name,
        mode: this.step() === 'distributed' ? 'distributed' : 'common',
        maxPlayers: this.maxPlayers(),
        password: this.passwordModel().password
      })
      if (gameId) {
        await this.router.navigate(['/game', gameId])
      }
    } catch (error) {
      if (error instanceof NameTakenError) {
        this.error.set('Une partie en cours ou en préparation porte déjà ce nom.')
        this.step.set('mode')
      } else {
        console.error('Impossible d\'enregistrer la partie', error)
        this.error.set('Impossible de créer la partie.')
      }
    } finally {
      this.creating.set(false)
    }
  }
}
