import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ILocation, ILocationImage } from 'src/app/shared/location/ILocation';
import { SelectedLocationService } from './selected-location.service';

@Component({
  selector: 'app-selected-location',
  templateUrl: './selected-location.page.html',
  styleUrls: ['./selected-location.page.scss']
})
export class SelectedLocationPage implements OnInit {
  dateControl = new FormControl(new Date());
  location: ILocation;
  images: ILocationImage[];
  travelTime: { text: string; value: number } = {
    text: 'Szacowanie...',
    value: 0
  };
  distanceText: string = 'Szacowanie';
  constructor(
    private selectedLocationService: SelectedLocationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getNowDate();
  }

  ionViewWillEnter() {
    this.loadLocation();
  }

  getNowDate() {
    let dateNow = new Date();
    const hours = dateNow.getHours();
    let minutes: any = dateNow.getMinutes();

    minutes = this.cacalculateRange(minutes);

    this.dateControl.patchValue(hours + ':' + minutes);
  }

  private cacalculateRange(minutes) {
    if (minutes < 15) {
      return 15;
    } else if (minutes < 30) {
      return 30;
    } else if (minutes < 45) {
      return 45;
    } else if (minutes > 45) {
      return '00';
    }
  }

  private loadLocation() {
    this.location = this.selectedLocationService.getLocation();
    console.log(this.location);
    if (!this.location) {
      this.router.navigate(['menu/main/tabs/tab1']);
    } else {
      this.images = this.location.images;
    }
  }

  onDistanceTravelTime(data) {
    this.travelTime = data;
  }

  onDistanceText(data) {
    this.distanceText = data;
  }

  goNow() {
    let travelTime = this.cacalculateRange(this.travelTime.value / 60);
    let splittedTime = this.dateControl.value.split(':');
    let minutes: any = +splittedTime[1] + +travelTime;
    if (minutes >= 60) {
      +splittedTime[0]++;
      minutes = minutes - 60;
    }
    if (minutes == 0) {
      minutes = '00';
    }
    const confirmData = {
      id: this.location.id,
      popularityData: [
        {
          time: splittedTime[0] + ':' + minutes,
          amount: 1
        }
      ]
    };

    this.selectedLocationService.confirmComing(confirmData).subscribe();
  }
}
