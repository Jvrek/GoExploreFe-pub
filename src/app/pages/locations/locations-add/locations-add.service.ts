import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ILocation } from 'src/app/shared/location/ILocation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsAddService {
  private baseUrl = `${environment.baserUrl}${environment.port}/api`;

  constructor(private http: HttpClient) {}

  public getActivityTypes(): Observable<Array<String>> {
    return this.http.get<Array<String>>(`${this.baseUrl}/activity-types`);
  }

  public addLocation(location: ILocation) {
    return this.http
      .post(`${this.baseUrl}/location/add`, location, {
        observe: 'response',
        responseType: 'text'
      })
      .pipe(
        mergeMap((response) => {
          return of<any>(response.body);
        })
      );
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
}
