import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';

import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {DialogUtils} from '../utils/dialog.utils';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse) {
        DialogUtils.error('Atenção', `Um erro aconteceu: ${JSON.stringify(error.error)}`, true);
      }
      return throwError(error);
    }),
  );
};
