import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperadminXpPage } from './superadmin-xp.page';

const routes: Routes = [
  {
    path: '',
    component: SuperadminXpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperadminXpPageRoutingModule {}
