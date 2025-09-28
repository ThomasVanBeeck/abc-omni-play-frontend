import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RankingXpPageRoutingModule } from './ranking-xp-routing.module';

import { RankingXpPage } from './ranking-xp.page';

import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LoadingIndicatorComponent } from 'src/app/common/loading-indicator/loading-indicator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaIconComponent,
    LoadingIndicatorComponent,
    RankingXpPageRoutingModule
  ],
  declarations: [RankingXpPage]
})
export class RankingXpPageModule {}
