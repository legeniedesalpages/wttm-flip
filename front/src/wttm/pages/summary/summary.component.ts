/**
 * Summary page of a finished game: duration, number of flips and shuffles, and players ranking by reaction time
 */
import { Component, computed, inject, input, resource } from '@angular/core'
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
                <span class="player-total">{{ format(player.totalMs) }} au total</span>
                <span class="player-rounds">{{ player.rounds }} tour(s)</span>
              </li>
            }
          </ol>

          @if (chart(); as c) {
            <h3>Temps de réaction au fil de la partie</h3>
            <figure class="chart">
              <svg viewBox="0 0 1000 340" role="img" aria-label="Temps pris par chaque joueur à chaque retournement de cartes">
                @for (tick of c.yTicks; track tick.y) {
                  <line x1="60" x2="990" [attr.y1]="tick.y" [attr.y2]="tick.y" class="grid" />
                  <text x="52" [attr.y]="tick.y + 4" text-anchor="end" class="axis">{{ tick.label }}</text>
                }
                @for (tick of c.xTicks; track tick.x) {
                  <text [attr.x]="tick.x" y="330" text-anchor="middle" class="axis">{{ tick.label }}</text>
                }
                @for (line of c.lines; track line.uid) {
                  <polyline [attr.points]="line.points" fill="none" [attr.stroke]="line.color" stroke-width="2" opacity="0.5" />
                  @for (dot of line.dots; track $index) {
                    <circle [attr.cx]="dot.x" [attr.cy]="dot.y" r="5" [attr.fill]="line.color">
                      <title>{{ line.name }} : {{ dot.label }}</title>
                    </circle>
                  }
                }
              </svg>
              <figcaption class="legend">
                @for (line of c.lines; track line.uid) {
                  <span><i [style.background-color]="line.color"></i>{{ line.name }}</span>
                }
              </figcaption>
            </figure>
          }
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

  protected readonly chart = computed(() => {
    const data = this.summary.value()
    if (!data || data.rounds.length === 0) {
      return null
    }
    const left = 60
    const right = 990
    const top = 15
    const bottom = 300
    const totalMs = Math.max(data.durationMs ?? 0, data.rounds[data.rounds.length - 1].atMs, 1)
    const maxMs = Math.max(1, ...data.rounds.flatMap(round => Object.values(round.times)))
    const x = (ms: number) => left + (ms / totalMs) * (right - left)
    const y = (ms: number) => bottom - (ms / maxMs) * (bottom - top)
    const colors = ['#e63946', '#1d7ae0', '#2a9d8f', '#f4a261', '#9b5de5', '#6c757d']
    const lines = data.ranking.map((player, index) => {
      const dots = data.rounds
        .filter(round => round.times[player.uid] !== undefined)
        .map(round => ({ x: x(round.atMs), y: y(round.times[player.uid]), label: this.format(round.times[player.uid]) }))
      return {
        uid: player.uid,
        name: player.name,
        color: colors[index % colors.length],
        dots,
        points: dots.map(dot => `${dot.x},${dot.y}`).join(' ')
      }
    })
    const yTicks = [0, 0.5, 1].map(ratio => ({ y: y(maxMs * ratio), label: this.format(maxMs * ratio) }))
    const xTicks = [0, 0.5, 1].map(ratio => ({ x: x(totalMs * ratio), label: this.format(totalMs * ratio) }))
    return { lines, yTicks, xTicks }
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
