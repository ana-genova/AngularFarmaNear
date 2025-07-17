import {Injectable} from '@angular/core';
import {UserType} from '../enum/user-type.enum';
import {TokenPayload} from '../interface/token-payload.interface';

@Injectable({
  providedIn: 'root',
})
export class PayloadService {

  static readonly constPayload = '_tokenFSUS';
  static readonly constLL = '_LLFSUS';

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

  get login(): string | null {
    return PayloadService.getValueStorage(PayloadService.constLL);
  }

  get tokenPayload(): TokenPayload | null {
    return PayloadService.getValueStorage(PayloadService.constPayload) as TokenPayload | null;
  }

  static addSession<T>(value: T): void {
    sessionStorage.setItem(PayloadService.constPayload, btoa(JSON.stringify(value)));
  }

  static saveLastLogin(login: string) {
    sessionStorage.setItem(PayloadService.constLL, btoa(JSON.stringify(login)));
  }

  static removeSession(): void {
    sessionStorage.removeItem(PayloadService.constPayload);
    sessionStorage.removeItem(PayloadService.constLL);
  }

  private static getValueStorage(name: string): any | null {
    let storage: any = sessionStorage.getItem(name);
    try {
      storage = JSON.parse(atob(storage));
    } catch {
      storage = null;
    }
    return storage;
  }
}
