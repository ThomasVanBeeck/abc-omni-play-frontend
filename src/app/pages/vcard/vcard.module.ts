import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {VcardPageRoutingModule} from './vcard-routing.module';

import {VcardPage} from './vcard.page';
import {LoadingIndicatorComponent} from "../../common/loading-indicator/loading-indicator.component";
import {NgxQrcodeStylingModule} from "ngx-qrcode-styling";
import {ConnectivityErrorComponent} from "../../common/conntectivity-error/connectivity-error.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VcardPageRoutingModule,
        LoadingIndicatorComponent,
        NgxQrcodeStylingModule,
        ConnectivityErrorComponent
    ],
  declarations: [VcardPage]
})
export class VcardPageModule {
}
