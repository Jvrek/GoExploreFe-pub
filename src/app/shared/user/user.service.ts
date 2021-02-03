import { Injectable } from '@angular/core';
import { IUser } from './I-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDetails: IUser;

  storeUserDetails(userDetails: IUser) {
    this.userDetails = userDetails;
  }

  getUserDetails(): IUser {
    return this.userDetails;
  }
}
