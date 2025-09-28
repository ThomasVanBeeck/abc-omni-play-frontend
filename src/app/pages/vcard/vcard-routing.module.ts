import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VcardPage } from './vcard.page';

const routes: Routes = [
  {
    path: '',
    component: VcardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VcardPageRoutingModule {}
