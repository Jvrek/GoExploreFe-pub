import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AlertController } from '@ionic/angular';
import {} from 'googlemaps';
const { Geolocation } = Plugins;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
  @Input()
  showMapControls: boolean = false;
  @Input()
  enableAddingMarkers: boolean = false;
  @Input()
  location: { lat: number; lng: number };
  @Input()
  showDirections: boolean = false;

  @Output()
  onMarkerPositionChange = new EventEmitter<google.maps.Marker>();
  @Output()
  onDistanceCalculate = new EventEmitter<number>();
  @Output()
  onDistanceText = new EventEmitter<string>();
  @Output()
  onDistanceTravelTime = new EventEmitter<google.maps.Duration>();

  @ViewChild('map', { static: false }) mapElement: ElementRef;
  directionsSerivce = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  map: google.maps.Map;
  marker: google.maps.Marker = null;

  userLocation: google.maps.LatLng;

  constructor(private alertController: AlertController) {}

  ngOnInit() {
    this.loadMap();
  }

  private async loadMap() {
    let mapOptions: google.maps.MapOptions;
    await Geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(
      (resp) => {
        this.userLocation = new google.maps.LatLng(
          resp.coords.latitude,
          resp.coords.longitude
        );
        this.showMapControls
          ? (mapOptions = {
              center: this.userLocation,
              zoom: 13,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              draggable: true,
              zoomControl: true,
              scrollwheel: false,
              disableDoubleClickZoom: true,
              disableDefaultUI: true,
              streetViewControl: false
            })
          : (mapOptions = {
              center: this.userLocation,
              zoom: 13,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              draggable: false,
              zoomControl: false,
              scrollwheel: false,
              disableDoubleClickZoom: true,
              disableDefaultUI: true,
              streetViewControl: false
            });
        if (!this.showDirections && this.location) {
          mapOptions.center = this.location;
        }
        this.map = new google.maps.Map(
          this.mapElement.nativeElement,
          mapOptions
        );

        if (this.location && this.showDirections) {
          this.directionsDisplay.setMap(this.map);
          this.calculateAndDisplayRoute(this.userLocation);
        }
        if (this.location) {
          this.placeMarker(this.location, this.map);
        }
        if (this.enableAddingMarkers) {
          google.maps.event.addListener(this.map, 'click', (event) => {
            this.placeMarker(event.latLng, this.map);
          });
        }
      }
    ),
      (error) => {
        console.log('Error getting location', error);
      };
  }

  private placeMarker(position, map) {
    if (this.marker == null) {
      this.marker = new google.maps.Marker({
        position: position,
        map: map
      });
    } else {
      this.marker.setPosition(position);
    }
    this.map.panTo(position);
    this.onMarkerPositionChange.emit(this.marker);
  }

  private calculateAndDisplayRoute(currentLocation: google.maps.LatLng) {
    this.directionsSerivce.route(
      {
        origin: currentLocation,
        destination: this.location,
        travelMode: google.maps.TravelMode.DRIVING
      },
      async (response, status) => {
        if (status === 'OK') {
          var totalDistance = 0;
          const legs = response.routes[0].legs;
          for (let i; i < legs.length; ++i) {
            totalDistance += legs[i].distance.value;
          }
          this.onDistanceCalculate.emit(
            response.routes[0].legs[0].distance.value
          );
          this.onDistanceTravelTime.emit(response.routes[0].legs[0].duration);
          this.onDistanceText.emit(response.routes[0].legs[0].distance.text);
          this.directionsDisplay.setDirections(response);
        } else {
          const alert = await this.alertController.create({
            header: 'Nie udało ustalić nawigacji',
            buttons: ['OK']
          });
          await alert.present();
        }
      }
    );
  }
}
