import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FleetPage } from './fleet.page';

const routes: Routes = [
  {
    path: '',
    component: FleetPage
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [
    ]
})
export class FleetPageRoutingModule {}
