import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationPopularityDetailsPage } from './location-popularity-details.page';

const routes: Routes = [
  {
    path: '',
    component: LocationPopularityDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationPopularityDetailsPageRoutingModule {}
