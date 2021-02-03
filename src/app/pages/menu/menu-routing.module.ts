import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'main',
        loadChildren: () =>
          import('../tabs/tabs.module').then((m) => m.TabsPageModule)
      },
      {
        path: 'locations',
        loadChildren: () =>
          import('../locations/locations-list/locations.module').then(
            (m) => m.LocationsPageModule
          )
      },
      {
        path: 'owned-locations',
        loadChildren: () =>
          import(
            '../locations/owned-locations-list/owned-locations.module'
          ).then((m) => m.OwnedLocationsPageModule)
      },
      {
        path: 'locations/add',
        loadChildren: () =>
          import('../locations/locations-add/locations-add.module').then(
            (m) => m.LocationsAddPageModule
          )
      },
      {
        path: 'locations/:id/:viewType',
        loadChildren: () =>
          import('../locations/location-details/location-details.module').then(
            (m) => m.LocationDetailsPageModule
          )
      },
      {
        path: 'location-popularity-details/:id',
        loadChildren: () =>
          import(
            '../locations/location-popularity-details/location-popularity-details.module'
          ).then((m) => m.LocationPopularityDetailsPageModule)
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../admin-panel/users/users-list/users.module').then(
            (m) => m.UsersPageModule
          )
      },
      {
        path: 'unactive-users',
        loadChildren: () =>
          import(
            '../admin-panel/users/unactive-users-list/unactive-users-list.module'
          ).then((m) => m.UnactiveUsersPageModule)
      },
      {
        path: 'users/:id/:viewType',
        loadChildren: () =>
          import('../admin-panel/users/user-details/user-details.module').then(
            (m) => m.UserDetailsPageModule
          )
      },
      {
        path: 'account-settings',
        loadChildren: () =>
          import('../account-settings/account-settings.module').then(
            (m) => m.AccountSettingsPageModule
          )
      },
      {
        path: 'selected-location',
        loadChildren: () =>
          import('../selected-location/selected-location.module').then(
            (m) => m.SelectedLocationPageModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuPageRoutingModule {}
