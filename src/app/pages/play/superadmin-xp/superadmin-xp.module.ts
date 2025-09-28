import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuperadminXpPageRoutingModule } from './superadmin-xp-routing.module';

import { SuperadminXpPage } from './superadmin-xp.page';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { LoadingIndicatorComponent } from 'src/app/common/loading-indicator/loading-indicator.component';
import { TabsSuperadminComponent } from 'src/app/common/tabs-superadmin/tabs-superadmin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaIconComponent,
    LoadingIndicatorComponent,
    TabsSuperadminComponent,
    SuperadminXpPageRoutingModule
  ],
  declarations: [SuperadminXpPage]
})
export class SuperadminXpPageModule {}