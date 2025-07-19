import {environment} from '../../../environments/environment';

export class EndpointUtils {

  private apiUrl: string = `${environment.baseUrl}`;
  private apiPharmacy: string = `${environment.baseUrl}/pharmacy`;
  private apiPatient: string = `${environment.baseUrl}/patient`;
  private apiFinder: string = `${environment.baseUrl}/finder`;

  ApiBase = {
    LOGIN: `${this.apiUrl}/login`,
    USER_CREATE: `${this.apiUrl}/user/create`,
  }

  ApiPatient = {
    CREATE: `${this.apiPatient}/patient/create`,
  }

  ApiPharmacy = {
    REGISTER: `${this.apiPharmacy}/register`,
    REGISTER_PHARMACY: `${this.apiPharmacy}/register/drugstore`,
  }

  ApiFinder = {
    PHARMACY_NEAR_ADDRESS: `${this.apiFinder}/pharmaciesNearAddress`,
    PHARMACY_NEAR_COORDINATES: `${this.apiFinder}/pharmaciesNearCoordinates`,
    LOCAL_MEDICINE: `${this.apiFinder}/local/medicine`,
  }
}
