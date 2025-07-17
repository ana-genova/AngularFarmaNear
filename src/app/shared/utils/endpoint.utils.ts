import {environment} from '../../../environments/environment';

export class EndpointUtils {

  private apiUrl: string = `${environment.baseUrl}`;
  private apiPharmacy: string = `${environment.baseUrl}/pharmacy`;
  private apiPatient: string = `${environment.baseUrl}/patient`;

  ApiBase = {
    LOGIN: `${this.apiUrl}/login`,
    USER_CREATE: `${this.apiUrl}/user/create`,
  }

  ApiPatient = {
    CREATE: `${this.apiPharmacy}/patient/create`,
  }

  ApiPharmacy = {
    REGISTER: `${this.apiPharmacy}/register`,
    REGISTER_PHARMACY: `${this.apiPharmacy}/register/drugstore`,
  }
}
