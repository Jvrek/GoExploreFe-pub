import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController
} from '@ionic/angular';
import { ILocation } from 'src/app/shared/location/ILocation';
import { LocationsService } from '../../locations/locations-list/locations.service';
import { SelectedLocationService } from '../../selected-location/selected-location.service';
import { Tab1Service } from '../tab1/tab1.service';
import { TabsService } from '../tabs.service';
import { Tab2Service } from './tab2.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  cardList: ILocation[] = [];
  distance: number;
  constructor(
    private pageService: Tab2Service,
    private locationsService: LocationsService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private tabsService: TabsService,
    private tab1Service: Tab1Service,
    private router: NavController,
    private selectedLocationService: SelectedLocationService
  ) {}

  ngOnInit() {
    this.listenToDistanceChange();
    this.tab1Service.getSearchCriteria().subscribe((searchCriteria) => {
      this.getFilteredLocationsList(searchCriteria);
    });
  }

  private listenToDistanceChange() {
    this.tabsService.getUpdatedDistance().subscribe((res) => {
      this.distance = res;
    });
  }

  ionViewDidEnter() {
    //console.log(this.distance);
  }

  private async getFilteredLocationsList(searchCriteria) {
    const loading = await this.loadingController.create();
    await loading.present();

    this.pageService.getFilteredLocations(searchCriteria).subscribe(
      async (res) => {
        await loading.dismiss();
        this.cardList = res;
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

  selectMade(locationSelected) {
    this.selectedLocationService.setLocation(locationSelected);
    this.router.navigateForward('/menu/selected-location');
  }

  // getCardList() {
  //   this.getLocationsList();
  // }
}
