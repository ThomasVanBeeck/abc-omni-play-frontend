import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeFullhistoryPageRoutingModule } from './home-fullhistory-routing.module';

import { HomeFullhistoryPage } from './home-fullhistory.page';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TabsSummaryComponent } from 'src/app/common/tabs-summary/tabs-summary.component';
import { LoadingIndicatorComponent } from 'src/app/common/loading-indicator/loading-indicator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeFullhistoryPageRoutingModule,
    FaIconComponent,
    TabsSummaryComponent,
    LoadingIndicatorComponent
  ],
  declarations: [HomeFullhistoryPage]
})
export class HomeFullhistoryPageModule {}
