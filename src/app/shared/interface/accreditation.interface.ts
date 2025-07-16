import {UserType} from '../enum/user-type.enum';

export interface Accreditation {
  login: string;
  password: string;
  name: string;
  role: UserType;
}
