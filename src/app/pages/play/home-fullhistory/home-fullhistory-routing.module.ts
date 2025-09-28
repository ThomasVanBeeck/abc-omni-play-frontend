import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeFullhistoryPage } from './home-fullhistory.page';

const routes: Routes = [
  {
    path: '',
    component: HomeFullhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeFullhistoryPageRoutingModule {}
