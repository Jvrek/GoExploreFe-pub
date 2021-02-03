import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILocation } from 'src/app/shared/location/ILocation';
import { environment } from 'src/environments/environment';
import { IsearchCriteria } from '../tab1/ISearchCriteria';

@Injectable({
  providedIn: 'root'
})
export class Tab2Service {
  private baseUrl = `${environment.baserUrl}${environment.port}/api`;

  constructor(private http: HttpClient) {}

  public getFilteredLocations(
    searchCriteria: IsearchCriteria
  ): Observable<ILocation[]> {
    return this.http
      .post(`${this.baseUrl}/location/getFiltered`, searchCriteria)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
