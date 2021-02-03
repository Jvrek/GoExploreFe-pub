import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationPopularityDetailsPageRoutingModule } from './location-popularity-details-routing.module';

import { LocationPopularityDetailsPage } from './location-popularity-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationPopularityDetailsPageRoutingModule
  ],
  declarations: [LocationPopularityDetailsPage]
})
export class LocationPopularityDetailsPageModule {}
