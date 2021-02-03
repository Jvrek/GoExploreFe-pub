import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/user/I-user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = `${environment.baserUrl}${environment.port}/api/users`;

  constructor(private http: HttpClient) {}

  public getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}/get`);
  }
}
