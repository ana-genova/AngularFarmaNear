import {Injectable} from '@angular/core';
import {UserType} from '../enum/user-type.enum';
import {TokenPayload} from '../interface/token-payload.interface';

@Injectable({
  providedIn: 'root',
})
export class PayloadService {

  static readonly constPayload = '_tokenFSUS';

  get isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  get userType(): UserType | null {
    return this.tokenPayload?.role || null;
  }

  get name(): string | null {
    return this.tokenPayload?.name || null;
  }

  get accessToken(): string | null {
    return this.tokenPayload?.authToken || null;
  }

  get tokenPayload(): TokenPayload | null {
    return PayloadService.getValueStorage(PayloadService.constPayload);
  }

  static addSession<T>(value: T): void {
    sessionStorage.setItem(PayloadService.constPayload, btoa(JSON.stringify(value)));
  }

  static removeSession(): void {
    sessionStorage.removeItem(PayloadService.constPayload);
  }

  private static getValueStorage(name: string): TokenPayload | null {
    let storage: any = sessionStorage.getItem(name);
    try {
      storage = JSON.parse(atob(storage)) as TokenPayload;
    } catch {
      storage = null;
    }
    return storage;
  }

}
