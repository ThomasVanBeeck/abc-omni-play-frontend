import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LoadingIndicatorComponent } from 'src/app/common/loading-indicator/loading-indicator.component';
import { IonicModule } from '@ionic/angular';

import { ActivityFormPageRoutingModule } from './activity-form-routing.module';

import { ActivityFormPage } from './activity-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaIconComponent,
    LoadingIndicatorComponent,
    ActivityFormPageRoutingModule
  ],
  declarations: [ActivityFormPage]
})
export class ActivityFormPageModule {}
