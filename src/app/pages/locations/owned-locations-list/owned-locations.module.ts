import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OwnedLocationsPageRoutingModule } from './owned-locations-routing.module';

import { OwnedLocationsPage } from './owned-locations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnedLocationsPageRoutingModule
  ],
  declarations: [OwnedLocationsPage]
})
export class OwnedLocationsPageModule {}
