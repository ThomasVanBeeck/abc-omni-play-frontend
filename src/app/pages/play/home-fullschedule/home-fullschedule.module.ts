import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeFullschedulePageRoutingModule } from './home-fullschedule-routing.module';
import { HomeFullschedulePage } from './home-fullschedule.page';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TabsSummaryComponent } from 'src/app/common/tabs-summary/tabs-summary.component';
import { LoadingIndicatorComponent } from 'src/app/common/loading-indicator/loading-indicator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaIconComponent,
    HomeFullschedulePageRoutingModule,
    TabsSummaryComponent,
    LoadingIndicatorComponent
  ],
  declarations: [HomeFullschedulePage]
})
export class HomeFullschedulePageModule {}
