/**
 * Button locked for a short delay each time `lockKey` changes (and on creation), to avoid double clicks
 */
import { Component, effect, input, output, signal } from '@angular/core'

@Component({
  selector: 'wttm-delayed-button',
  template: `
    <button type="button" [disabled]="disabled() || locked()" (click)="pressed.emit()">
      <ng-content />
    </button>
  `,
  styleUrl: './delayed-button.component.css'
})
export class DelayedButtonComponent {
  readonly lockKey = input<unknown>(null)
  readonly delay = input(2000)
  readonly disabled = input(false)

  readonly pressed = output()

  protected readonly locked = signal(true)

  constructor() {
    effect(onCleanup => {
      this.lockKey()
      this.locked.set(true)
      const timer = setTimeout(() => this.locked.set(false), this.delay())
      onCleanup(() => clearTimeout(timer))
    })
  }
}
