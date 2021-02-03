import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';

import { Plugins } from '@capacitor/core';
import { User } from '../shared/user/user';
import { IUser } from '../shared/user/I-user';
import { UserService } from '../shared/user/user.service';
import { environment } from 'src/environments/environment';
const { Storage } = Plugins;

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = `${environment.baserUrl}${environment.port}`;
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  private token = '';

  constructor(private http: HttpClient, private userService: UserService) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.token = token.value;
      this.generateAndStoreUserDetails(this.token);
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: { username; password }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/login`, credentials).pipe(
      map((data: any) => data.accessToken),
      switchMap((token) => {
        this.token = token;
        return from(Storage.set({ key: TOKEN_KEY, value: token }));
      }),
      tap(() => {
        this.generateAndStoreUserDetails(this.token);
        this.isAuthenticated.next(true);
      })
    );
  }

  register(data: { username; password; email; roles }) {
    return this.http.post(`${this.baseUrl}/api/auth/register`, data);
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({ key: TOKEN_KEY });
  }

  decodeJWTtoken(token: string): IUser {
    const decodedToken = jwt_decode(token, { header: false }) as IUser;
    const userDetails: IUser = {
      accessToken: token,
      username: decodedToken.username,
      roles: decodedToken.roles,
      email: decodedToken.email,
      id: decodedToken.id,
      isActive: decodedToken.isActive
    };
    return userDetails;
  }

  private generateAndStoreUserDetails(token: string) {
    this.userService.storeUserDetails(this.decodeJWTtoken(token));
  }

  getToken() {
    return this.token;
  }
}
