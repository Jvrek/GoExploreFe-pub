import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { IPopularityData } from './IPopularityData';

@Injectable({
  providedIn: 'root'
})
export class LocationPopularityDetailsService {
  private baseUrl = `${environment.baserUrl}${environment.port}/api/location-popularity`;
  constructor(private http: HttpClient) {}

  getPopularity(id): Observable<IPopularityData[]> {
    return this.http.get<IPopularityData[]>(`${this.baseUrl}/get/${id}`).pipe(
      map((res: any) => {
        return res.popularityData as IPopularityData[];
      })
    );
  }
}
