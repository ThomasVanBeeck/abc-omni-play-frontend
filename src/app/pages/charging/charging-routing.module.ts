import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChargingPage } from './charging-page';

const routes: Routes = [
  {
    path: '',
    component: ChargingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChargingPageRoutingModule {}
