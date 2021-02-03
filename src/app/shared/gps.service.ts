import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
import {} from 'googlemaps';
@Injectable({
  providedIn: 'root'
})
export class GpsService {
  userCords: google.maps.LatLng;
  constructor() {}

  startGpsTracking() {
    Geolocation.watchPosition({ enableHighAccuracy: true }, (gps) => {
      this.userCords = new google.maps.LatLng(
        gps.coords.latitude,
        gps.coords.longitude
      );
    });
  }
}
