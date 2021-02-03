import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ILocation } from 'src/app/shared/location/ILocation';
import { ISwipeCard } from 'src/app/shared/swipe-cards/ISwipe-card';
import { LocationsService } from './locations.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss']
})
export class LocationsPage implements OnInit {
  locations: ILocation[] = [];
  constructor(
    private locationsService: LocationsService,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getLocationsList();
  }

  private async getLocationsList() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.locationsService.getAllLocations().subscribe(
      async (res) => {
        await loading.dismiss();
        this.locations = res;
      },
      async (err) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Nie udało się pobrac listy lokacji',
          message: err.error.error,
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  doRefresh(event) {
    this.getLocationsList().then(() => {
      event.target.complete();
    });
  }
}
