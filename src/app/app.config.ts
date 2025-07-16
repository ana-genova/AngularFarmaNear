import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {provideHttpClient, withInterceptors} from '@angular/common/http';

import {routes} from './app.routes';

import {errorInterceptor} from './shared/interceptors/error.interceptor';
import {authInterceptor} from './shared/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}), provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        authInterceptor,
        errorInterceptor,
      ])
    )
  ]
};
