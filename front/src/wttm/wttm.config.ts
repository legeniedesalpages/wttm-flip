/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 23/07/2025 - 22:57:08
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 23/07/2025
    * - Author          : renau
    * - Modification    : 
**/
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './wttm.routes';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ]
};
