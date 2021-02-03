import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from 'src/app/shared/location/ILocation';
import { ISwipeCard } from 'src/app/shared/swipe-cards/ISwipe-card';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OwnedLocationsService {
  private baseUrl = `${environment.baserUrl}${environment.port}/api`;

  constructor(private http: HttpClient) {}

  public getAllLocations(id): Observable<ILocation[]> {
    return this.http.get<ILocation[]>(
      `${this.baseUrl}/location/get-owned/${id}`
    );
  }
}
