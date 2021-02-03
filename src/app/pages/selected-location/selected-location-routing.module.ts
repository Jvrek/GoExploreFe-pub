import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectedLocationPage } from './selected-location.page';

const routes: Routes = [
  {
    path: '',
    component: SelectedLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectedLocationPageRoutingModule {}
