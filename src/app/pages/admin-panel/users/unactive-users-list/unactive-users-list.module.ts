import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsersPageRoutingModule } from './unactive-users-list-routing.module';

import { UsersUnactiveListPage } from './unactive-users-list.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, UsersPageRoutingModule],
  declarations: [UsersUnactiveListPage]
})
export class UnactiveUsersPageModule {}
