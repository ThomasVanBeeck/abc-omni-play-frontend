import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewsDetailsPageRoutingModule } from './news-details-routing.module';

import { NewsDetailsPage } from './news-details.page';
import { UserCardComponent } from '../../common/user-card/user-card.component';
import { LoadingIndicatorComponent } from '../../common/loading-indicator/loading-indicator.component';
import { TranslocoDirective } from '@jsverse/transloco';
import { ConnectivityErrorComponent } from '../../common/conntectivity-error/connectivity-error.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewsDetailsPageRoutingModule,
    UserCardComponent,
    LoadingIndicatorComponent,
    TranslocoDirective,
    ConnectivityErrorComponent,
    FaIconComponent
  ],
  declarations: [NewsDetailsPage],


})
export class NewsDetailsPageModule {
}
