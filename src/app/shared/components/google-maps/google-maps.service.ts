import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private loaded = false;

  loadGoogleMapsScript(): Promise<void> {
    if (this.loaded) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=marker`;
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        this.loaded = true;
        resolve();
      };
      script.onerror = (error) => {
        reject(error);
      };
      document.head.appendChild(script);
    });
  }
}
