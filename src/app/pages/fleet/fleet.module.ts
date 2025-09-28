import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {FleetPageRoutingModule} from './fleet-routing.module';

import {FleetPage} from './fleet.page';
import {NotificationComponent} from '../../notification/notification.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {IsLeasingCar} from '../../util/isLeasingCar.pipe';
import {IsCompanyCar} from '../../util/isCompanyCar.pipe';
import {LoadingIndicatorComponent} from "../../common/loading-indicator/loading-indicator.component";
import {CarAttachmentsComponent} from "./sub-components/car-attachments/car-attachments.component";
import {CarDriverComponent} from "./sub-components/car-driver/car-driver.component";
import {CarInfoComponent} from "./sub-components/car-info/car-info.component";
import {TranslocoDirective} from "@jsverse/transloco";
import {ConnectivityErrorComponent} from "../../common/conntectivity-error/connectivity-error.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FleetPageRoutingModule,
        FontAwesomeModule,
        LoadingIndicatorComponent,
        TranslocoDirective,
        ConnectivityErrorComponent,
    ],

  declarations: [FleetPage, NotificationComponent, IsLeasingCar, IsCompanyCar, CarAttachmentsComponent, CarDriverComponent, CarInfoComponent],
})
export class FleetPageModule {
  constructor() {}
}
