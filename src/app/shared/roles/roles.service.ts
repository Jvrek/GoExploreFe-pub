import { Injectable } from '@angular/core';
import { IUser } from '../user/I-user';
import { UserService } from '../user/user.service';
import { Role } from './roles.enum';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  constructor(private userService: UserService) {}

  checkAdminPermission(): boolean {
    return (
      this.userService.getUserDetails().roles.indexOf(Role.ROLE_ADMIN) > -1
    );
  }
}
