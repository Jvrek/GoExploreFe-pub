import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationDetailsPageRoutingModule } from './location-details-routing.module';

import { LocationDetailsPage } from './location-details.page';
import { FileUploaderComponent } from 'src/app/shared/file-uploader/file-uploader.component';
import { GoogleMapComponent } from 'src/app/shared/google-map/google-map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationDetailsPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LocationDetailsPage, FileUploaderComponent, GoogleMapComponent]
})
export class LocationDetailsPageModule {}
