import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, Observable, shareReplay} from 'rxjs';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private readonly configUrl = '/.env';
  readonly appTitle = 'FarmaSUS';

  constructor(private http: HttpClient) {
  }

  get loadConfiguration$(): Observable<any> {
    return this.http.get(this.configUrl, {responseType: 'text'}).pipe(
      shareReplay(1),
      map((config: any) => {
        const envContent: any = this.parseEnv(config);
        environment.baseUrl = envContent.baseUrl;
        environment.googleMapId = envContent.googleMapId;
        environment.googleMapsApiKey = envContent.googleMapsApiKey;
      })
    );
  }

  private parseEnv(envContent: string): { [key: string]: string } {
    const parsed = {};
    const lines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#')); // Ignorar linhas vazias e comentários
    for (const line of lines) {
      const [key, ...value] = line.split('=');
      // @ts-ignore
      parsed[key.trim()] = value.join('=').trim();
    }
    return parsed;
  }

}
