import {
  ApplicationConfig,
  DEFAULT_CURRENCY_CODE,
  inject,
  LOCALE_ID,
  provideAppInitializer,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {provideHttpClient, withInterceptors} from '@angular/common/http';

import {routes} from './app.routes';
import {authInterceptor} from './shared/interceptors/auth.interceptor';
import {AppConfigService} from './app.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideAppInitializer(() => inject(AppConfigService).loadConfiguration$),
    provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
      ])
    ),
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL'},
  ]
};
