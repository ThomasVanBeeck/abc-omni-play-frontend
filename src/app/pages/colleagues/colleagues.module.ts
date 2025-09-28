import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColleaguesPageRoutingModule } from './colleagues-routing.module';

import { ColleaguesPage } from './colleagues.page';
import { UserCardComponent } from '../../common/user-card/user-card.component';
import { LoadingIndicatorComponent } from '../../common/loading-indicator/loading-indicator.component';
import { TranslocoDirective } from '@jsverse/transloco';
import { BirthdayListComponent } from './birthday-list/birthday-list.component';
import { ConnectivityErrorComponent } from '../../common/conntectivity-error/connectivity-error.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColleaguesPageRoutingModule,
    UserCardComponent,
    LoadingIndicatorComponent,
    TranslocoDirective,
    BirthdayListComponent,
    ConnectivityErrorComponent,
    FaIconComponent
  ],
  declarations: [ColleaguesPage],


})
export class ColleaguesPageModule {
}
