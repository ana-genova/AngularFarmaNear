import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import {Credentials, TokenPayload} from '../interface/token-payload.interface';

import {PayloadService} from './payload.service';

import {EndpointUtils} from '../utils/endpoint.utils';
import {RoutesUtils} from '../utils/routes.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router,
              private httpClient: HttpClient,
              private payloadService: PayloadService) {
  }

  authenticate$(credentials: Credentials): Observable<boolean> {
    return this.httpClient.post<TokenPayload>(new EndpointUtils().ApiBase.LOGIN, credentials).pipe(switchMap((response: any) => {
      if (response) {
        PayloadService.addSession(response);
      }
      return of(true);
    }));
  }

  unauthorize(): void {
    PayloadService.removeSession();

    this.router.navigate([RoutesUtils.LOGIN]);
  }

  authHeader(token?: string): { Authorization: string } {
    return {Authorization: `Bearer ${token ?? this.payloadService.accessToken}`};
  }

  get logout$(): Observable<any> {
    return this.httpClient.delete(new EndpointUtils().ApiBase.LOGIN).pipe(tap(() => this.unauthorize()));
  }
}
