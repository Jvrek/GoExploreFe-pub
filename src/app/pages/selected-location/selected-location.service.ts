import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILocation } from 'src/app/shared/location/ILocation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SelectedLocationService {
  private baseUrl = `${environment.baserUrl}${environment.port}/api/location-popularity`;
  private location: ILocation;
  constructor(private http: HttpClient) {}

  setLocation(location: ILocation) {
    this.location = location;
  }

  getLocation(): ILocation {
    return this.location;
  }

  resetLocation() {
    this.location = null;
  }

  confirmComing(confirmData) {
    return this.http.patch(`${this.baseUrl}/update`, confirmData);
  }
}
