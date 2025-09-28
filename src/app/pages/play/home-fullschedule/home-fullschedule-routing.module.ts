import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeFullschedulePage } from './home-fullschedule.page';

const routes: Routes = [
  {
    path: '',
    component: HomeFullschedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeFullschedulePageRoutingModule {}
