import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChargingPageRoutingModule } from './charging-routing.module';

import { ChargingPage } from './charging-page';
import { LoadingIndicatorComponent } from '../../common/loading-indicator/loading-indicator.component';
import { NgxQrcodeStylingModule } from 'ngx-qrcode-styling';
import { ConnectivityErrorComponent } from '../../common/conntectivity-error/connectivity-error.component';
import { TranslocoDirective } from '@jsverse/transloco';
import { SafePipe } from '../../pipes/safe.pipe';

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
    SafePipe
  ],
  declarations: [ChargingPage]
})
export class ChargingPageModule {
}
