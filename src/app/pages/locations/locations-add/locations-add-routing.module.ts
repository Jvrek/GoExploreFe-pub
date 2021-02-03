import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationsAddPage } from './locations-add.page';

const routes: Routes = [
  {
    path: '',
    component: LocationsAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationsAddPageRoutingModule {}
