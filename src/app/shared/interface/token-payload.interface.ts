import {UserType} from '../enum/user-type.enum';

export interface TokenPayload {
  authToken: string;
  name: string;
  login: string;
  role: UserType;
}

export interface Credentials {
  login: string;
  password: string;
}
