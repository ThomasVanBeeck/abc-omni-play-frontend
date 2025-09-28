import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScoresFormPageRoutingModule } from './scores-form-routing.module';
import { ScoresFormPage } from './scores-form.page';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LoadingIndicatorComponent } from 'src/app/common/loading-indicator/loading-indicator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
        FaIconComponent,
        LoadingIndicatorComponent,
    ScoresFormPageRoutingModule
  ],
  declarations: [ScoresFormPage]
})
export class ScoresFormPageModule {}
