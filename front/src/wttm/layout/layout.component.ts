/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 24/07/2025 - 12:37:38
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 24/07/2025
    * - Author          : renau
    * - Modification    : 
**/
/**
 * Layout component for WTTM Flip Cards application
 * Provides flexible header and footer areas with sticky positioning
 */
import { Component, input, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'wttm-layout',
  template: `
    <div class="layout">
      @if (showHeader()) {
        <header class="layout__header">
          <ng-content select="[slot=header]" />
        </header>
      }
      
      <main class="layout__main">
        <ng-content />
      </main>
      
      @if (showFooter()) {
        <footer class="layout__footer">
          <ng-content select="[slot=footer]" />
        </footer>
      }
    </div>
  `,
  styles: `
    .layout {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .layout__header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--header-bg);
      border-bottom: var(--header-border);
      box-shadow: var(--header-shadow);
    }

    .layout__main {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .layout__footer {
      position: sticky;
      bottom: 0;
      z-index: 100;
      background: var(--footer-bg);
      border-top: var(--footer-border);
      box-shadow: var(--footer-shadow);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  /**
   * Controls whether the header is displayed
   */
  readonly showHeader = input(true)
  
  /**
   * Controls whether the footer is displayed
   */
  readonly showFooter = input(false)
}
