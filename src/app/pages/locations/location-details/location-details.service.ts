import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ILocation } from 'src/app/shared/location/ILocation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationDetailsService {
  private baseUrl = `${environment.baserUrl}${environment.port}/api`;
  constructor(private http: HttpClient) {}

  public getActivityTypes(): Observable<Array<String>> {
    return this.http.get<Array<String>>(`${this.baseUrl}/activity-types`);
  }

  public getLocation(id: string): Observable<ILocation> {
    return this.http.get<ILocation>(`${this.baseUrl}/location/get/${id}`);
  }

  public updateLocation(location: ILocation, id: string) {
    return this.http
      .patch(`${this.baseUrl}/location/update/${id}`, location, {
        observe: 'response',
        responseType: 'text'
      })
      .pipe(
        mergeMap((response) => {
          return of<any>(response.body);
        })
      );
  }

  public deleteLocation(id) {
    return this.http
      .post(`${this.baseUrl}/location/delete`, id, {
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
