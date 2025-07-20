import {inject} from '@angular/core';
import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';

import {catchError, map, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

import {AuthService} from '../service/auth.service';
import {PayloadService} from '../service/payload.service';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const payloadService = inject(PayloadService);

  if (!request.headers.get('Authorization')) {
    request = payloadService.accessToken
      ? request.clone({setHeaders: authService.authHeader()})
      : request.clone({withCredentials: true});
  }

  return next(request).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 403) {
        return handle403(authService);
      }
      return throwError(() => error);
    })
  );
};

function handle403(authService: AuthService): Observable<never> {
  authService.unauthorize();
  return throwError(() => new Error('Acesso negado'));
}
