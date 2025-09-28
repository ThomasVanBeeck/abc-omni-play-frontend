import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { BrowseUsersPage } from './browse-users.page';

const routes: Routes = [
  {
    path: '',
    component: BrowseUsersPage
  }
];

@NgModule({
  imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrowseUsersPageRoutingModule {}
