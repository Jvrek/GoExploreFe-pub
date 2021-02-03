import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IUser } from 'src/app/shared/user/I-user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private baseUrl = `${environment.baserUrl}${environment.port}/api/users`;

  constructor(private http: HttpClient) {}

  public getUser(id): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/get/${id}`);
  }

  public updateUser(user: IUser, id: string) {
    return this.http
      .patch(`${this.baseUrl}/update/${id}`, user, {
        observe: 'response',
        responseType: 'text'
      })
      .pipe(
        mergeMap((response) => {
          return of<any>(response.body);
        })
      );
  }
}
