import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuperadminAdminsPageRoutingModule } from './superadmin-admins-routing.module';

import { SuperadminAdminsPage } from './superadmin-admins.page';
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
    SuperadminAdminsPageRoutingModule
  ],
  declarations: [SuperadminAdminsPage]
})
export class SuperadminAdminsPageModule {}
