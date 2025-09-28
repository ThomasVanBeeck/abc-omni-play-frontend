import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModuleCardComponent } from './module-card/module-card.component';
import { TranslocoDirective } from '@jsverse/transloco';
import { ConnectivityErrorComponent } from '../../common/conntectivity-error/connectivity-error.component';
import { FastActionButtonComponent } from '../../common/fast-action-button/fast-action-button.component';
import { EventSummaryComponent } from '../../common/event-summary/event-summary.component';
import {NewsSummaryComponent} from "../../common/news-summary/news-summary.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        HttpClientModule,
        NgOptimizedImage,
        FontAwesomeModule,
        ModuleCardComponent,
        TranslocoDirective,
        ConnectivityErrorComponent,
        FastActionButtonComponent,
        EventSummaryComponent,
        NewsSummaryComponent
    ],
  declarations: [
    HomePage,
  ],
})
export class HomePageModule {
}
