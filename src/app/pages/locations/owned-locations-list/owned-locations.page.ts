import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ILocation } from 'src/app/shared/location/ILocation';
import { UserService } from 'src/app/shared/user/user.service';
import { OwnedLocationsService } from './owned-locations.service';

@Component({
  selector: 'owned-app-locations',
  templateUrl: './owned-locations.page.html',
  styleUrls: ['./owned-locations.page.scss']
})
export class OwnedLocationsPage implements OnInit {
  locations: ILocation[] = [];
  private id: string;
  constructor(
    private locationsService: OwnedLocationsService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private userService: UserService
  ) {
    this.id = this.userService.getUserDetails().id;
  }

  ngOnInit() {
    this.getLocationsList();
  }

  private async getLocationsList() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.locationsService.getAllLocations(this.id).subscribe(
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
