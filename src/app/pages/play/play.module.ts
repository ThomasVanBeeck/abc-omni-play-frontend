import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayPageRoutingModule } from './play-routing.module';

import { PlayPage } from './play.page';
import { ConnectivityErrorComponent } from 'src/app/common/conntectivity-error/connectivity-error.component';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlayPageRoutingModule,
    ConnectivityErrorComponent,
    FaIconComponent,
    FontAwesomeModule
  ],
  declarations: [PlayPage]
})
export class PlayPageModule {}
