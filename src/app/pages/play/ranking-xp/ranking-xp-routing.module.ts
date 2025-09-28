import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RankingXpPage } from './ranking-xp.page';

const routes: Routes = [
  {
    path: '',
    component: RankingXpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RankingXpPageRoutingModule {}
