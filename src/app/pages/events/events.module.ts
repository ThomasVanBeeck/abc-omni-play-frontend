import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChargingPageRoutingModule } from './events-routing.module';

import { EventsPage } from './events-page';
import { LoadingIndicatorComponent } from '../../common/loading-indicator/loading-indicator.component';
import { NgxQrcodeStylingModule } from 'ngx-qrcode-styling';
import { ConnectivityErrorComponent } from '../../common/conntectivity-error/connectivity-error.component';
import { TranslocoDirective } from '@jsverse/transloco';
import { SafePipe } from '../../pipes/safe.pipe';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChargingPageRoutingModule,
    LoadingIndicatorComponent,
    NgxQrcodeStylingModule,
    ConnectivityErrorComponent,
    TranslocoDirective,
    SafePipe,
    NgOptimizedImage,
    FaIconComponent,
    CommentComponent
  ],
  declarations: [EventsPage]
})
export class EventsPageModule {
}
