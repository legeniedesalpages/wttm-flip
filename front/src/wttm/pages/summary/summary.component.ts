/**
 * Summary page of a finished game: duration, number of flips and shuffles, and players ranking by reaction time
 */
import { Component, inject, input, resource } from '@angular/core'
import { RouterLink } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { PageShellComponent } from '../../components/page-shell/page-shell.component'
import { GameService } from '../../services/game.service'

@Component({
  selector: 'wttm-summary',
  imports: [RouterLink, MatButtonModule, PageShellComponent],
  template: `
    <wttm-page-shell>
      <section class="summary">
        @if (summary.value(); as data) {
          <h2 class="game-name">{{ data.name }}</h2>

          <dl class="figures">
            <div>
              <dt>Durée de la partie</dt>
              <dd>{{ data.durationMs === null ? '—' : format(data.durationMs) }}</dd>
            </div>
            <div>
              <dt>Cartes retournées</dt>
              <dd>{{ data.flips }}</dd>
            </div>
            <div>
              <dt>Mélanges</dt>
              <dd>{{ data.shuffles }}</dd>
            </div>
          </dl>

          <h3>Classement du plus lent au plus rapide</h3>
          <ol class="ranking">
            @for (player of data.ranking; track player.uid) {
              <li>
                <span class="player-name">{{ player.name }}</span>
                <span class="player-time">
                  {{ player.averageMs === null ? '—' : format(player.averageMs) + ' en moyenne' }}
                </span>
                <span class="player-rounds">{{ player.rounds }} tour(s)</span>
              </li>
            }
          </ol>
        } @else if (!summary.isLoading()) {
          <p class="error" role="alert">Résumé introuvable.</p>
        }
        <a matButton="filled" class="home-button" routerLink="/">Retour à l'accueil</a>
      </section>
    </wttm-page-shell>
  `,
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
  readonly id = input.required<string>()

  private readonly gameService = inject(GameService)

  protected readonly summary = resource({
    params: () => this.id(),
    loader: ({ params }) => this.gameService.getSummary(params)
  })

  protected format(ms: number): string {
    const seconds = ms / 1000
    if (seconds < 60) {
      return seconds.toFixed(1).replace('.', ',') + ' s'
    }
    const total = Math.round(seconds)
    const hours = Math.floor(total / 3600)
    const minutes = Math.floor((total % 3600) / 60)
    const rest = total % 60
    return (hours > 0 ? `${hours} h ` : '') + `${minutes} min ${rest} s`
  }
}
