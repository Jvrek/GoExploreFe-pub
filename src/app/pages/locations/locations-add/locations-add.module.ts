import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationsAddPageRoutingModule } from './locations-add-routing.module';

import { LocationsAddPage } from './locations-add.page';
import { FileUploaderComponent } from 'src/app/shared/file-uploader/file-uploader.component';
import { SwipeCardsComponent } from 'src/app/shared/swipe-cards/swipe-cards.component';
import { GoogleMapComponent } from 'src/app/shared/google-map/google-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationsAddPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    LocationsAddPage,
    FileUploaderComponent,
    SwipeCardsComponent,
    GoogleMapComponent
  ]
})
export class LocationsAddPageModule {}
