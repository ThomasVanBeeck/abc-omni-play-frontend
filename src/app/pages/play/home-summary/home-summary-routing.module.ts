import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeSummaryPage } from './home-summary.page';

const routes: Routes = [
  {
    path: '',
    component: HomeSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeSummaryRoutingModule {}
