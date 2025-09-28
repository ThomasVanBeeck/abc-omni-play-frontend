import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityDetailsPageRoutingModule } from './activity-details-routing.module';

import { ActivityDetailsPage } from './activity-details.page';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LoadingIndicatorComponent } from 'src/app/common/loading-indicator/loading-indicator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaIconComponent,
    LoadingIndicatorComponent,
    ActivityDetailsPageRoutingModule
  ],
  declarations: [ActivityDetailsPage]
})
export class ActivityDetailsPageModule {}
