import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperadminAdminsPage } from './superadmin-admins.page';

const routes: Routes = [
  {
    path: '',
    component: SuperadminAdminsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperadminAdminsPageRoutingModule {}
