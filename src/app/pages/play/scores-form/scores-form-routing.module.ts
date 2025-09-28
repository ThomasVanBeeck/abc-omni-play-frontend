import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScoresFormPage } from './scores-form.page';

const routes: Routes = [
  {
    path: '',
    component: ScoresFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScoresFormPageRoutingModule {}
