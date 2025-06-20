import {environment} from '../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly googleMapsApiKey: string;

  constructor() {
    this.googleMapsApiKey = environment.googleMapsApiKey;
  }

  getGoogleMapsApiKey(): string {
    return this.googleMapsApiKey;
  }
}
