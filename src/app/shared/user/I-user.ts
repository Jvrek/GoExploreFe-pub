import { Role } from '../roles/roles.enum';

export interface IUser {
  username: string;
  id?: string;
  accessToken?: string;
  email: string;
  roles: Role[];
  isActive: boolean;
}
