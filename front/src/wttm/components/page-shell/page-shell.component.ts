/**
 * Common page frame (banner header, footer with version) shared by the home and new game pages
 */
import { Component } from '@angular/core'
import { NgOptimizedImage } from '@angular/common'
import { LayoutComponent } from '../../layout/layout.component'
import { environment } from '../../../environments/environment'

@Component({
  selector: 'wttm-page-shell',
  imports: [LayoutComponent, NgOptimizedImage],
  template: `
    <wttm-layout [showHeader]="true" [showFooter]="true">
      <div slot="header" class="home-header">
        <div class="banner">
          <div class="banner-side banner-side-left" aria-hidden="true">
            <img [ngSrc]="bannerUrl" alt="" width="761" height="200" />
          </div>
          <img [ngSrc]="bannerUrl"
               alt="Welcome to the Moon - Banner"
               class="banner-image"
               width="761"
               height="200"
               priority />
          <div class="banner-side banner-side-right" aria-hidden="true">
            <img [ngSrc]="bannerUrl" alt="" width="761" height="200" />
          </div>
        </div>
      </div>

      <div class="home-content">
        <h1 class="visually-hidden">{{ env.title }}</h1>
        <div class="start-game">
          <ng-content />
        </div>
      </div>

      <div slot="footer" class="home-footer">
        <span class="copyright">
          ©LGDA - Version {{ env.version }}
        </span>
      </div>
    </wttm-layout>
  `,
  styleUrl: './page-shell.component.css'
})
export class PageShellComponent {
  protected readonly env = environment
  protected readonly bannerUrl = `${environment.assetsPrefix}/assets/images/banner.png`
}
