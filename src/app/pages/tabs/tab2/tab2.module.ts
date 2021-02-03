import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { SwipeCardsComponent } from 'src/app/shared/swipe-cards/swipe-cards.component';
import { GoogleMapComponent } from 'src/app/shared/google-map/google-map.component';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, Tab2PageRoutingModule],
  declarations: [Tab2Page, SwipeCardsComponent, GoogleMapComponent]
})
export class Tab2PageModule {}
