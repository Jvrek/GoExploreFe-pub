import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectedLocationPageRoutingModule } from './selected-location-routing.module';

import { SelectedLocationPage } from './selected-location.page';
import { GoogleMapComponent } from 'src/app/shared/google-map/google-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectedLocationPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SelectedLocationPage, GoogleMapComponent]
})
export class SelectedLocationPageModule {}
