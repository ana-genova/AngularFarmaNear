import {environment} from '../../../environments/environment';

export class EndpointUtils {

  private apiUrl: string = `${environment.baseUrl}`;

  ApiBase = {
    LOGIN: `${this.apiUrl}/login`,
    USER_CREATE: `${this.apiUrl}/user/create`,
  }
}
