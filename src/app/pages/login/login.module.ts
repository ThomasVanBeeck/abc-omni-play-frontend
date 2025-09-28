import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {LoginPageRoutingModule} from './login-routing.module';

import {LoginPage} from './login.page';
import {LoadingIndicatorComponent} from "../../common/loading-indicator/loading-indicator.component";
import {NgxQrcodeStylingModule} from "ngx-qrcode-styling";
import {OmniIconComponent} from "../../common/omni-icon/omni-icon.component";
import {TranslocoDirective} from "@jsverse/transloco";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPageRoutingModule,
        LoadingIndicatorComponent,
        NgxQrcodeStylingModule,
        OmniIconComponent,
        NgOptimizedImage,
        TranslocoDirective,
    ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
