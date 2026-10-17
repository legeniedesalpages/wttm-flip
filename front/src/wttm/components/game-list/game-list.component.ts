/**
 * Game List component for WTTM Flip Cards application
 * Displays available games list with join functionality
 */
import { Component, input, output } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { Game } from '../../model/game-model'

@Component({
  selector: 'wttm-game-list',
  imports: [MatButtonModule],
  template: `
    <ul class="games-list">
      @for (game of games(); track game.id) {
        <li class="game-item">
          <div class="game-info">
            <div class="game-creator">{{ game.name }}</div>
            @if (game.mode === 'distributed') {
              <div class="game-details">
                <span class="player-count">{{ game.playerCount }}/{{ game.maxPlayers }} joueurs</span>
                @if (game.hasPassword) { · 🔒 }
                @if (game.status === 'playing') { · en cours }
              </div>
            }
          </div>

          <button matButton="outlined" class="join-button" [disabled]="!canJoin(game)" (click)="gameJoined.emit(game.id)">
            Rejoindre
          </button>
        </li>
      } @empty {
        <li class="game-item">Aucune partie en cours</li>
      }
    </ul>
  `,
  styleUrl: './game-list.component.css'
})
export class GameListComponent {
  readonly games = input.required<Game[]>()

  readonly gameJoined = output<string>()

  protected canJoin(game: Game): boolean {
    return game.mode === 'distributed' && game.status === 'waiting' && game.playerCount < game.maxPlayers
  }
}
