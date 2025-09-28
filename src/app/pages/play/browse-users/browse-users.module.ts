import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BrowseUsersPageRoutingModule } from './browse-users-routing.module';

import { BrowseUsersPage } from './browse-users.page';

import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LoadingIndicatorComponent } from 'src/app/common/loading-indicator/loading-indicator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaIconComponent,
    LoadingIndicatorComponent,

    BrowseUsersPageRoutingModule
  ],
  declarations: [BrowseUsersPage]
})
export class BrowseUsersPageModule {}
