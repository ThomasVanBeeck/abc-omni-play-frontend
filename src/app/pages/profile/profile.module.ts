import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingIndicatorComponent } from '../../common/loading-indicator/loading-indicator.component';
import { UserCardComponent } from '../../common/user-card/user-card.component';
import { TranslocoDirective } from '@jsverse/transloco';
import { ConnectivityErrorComponent } from '../../common/conntectivity-error/connectivity-error.component';
import { ExperiencesComponent } from './expierences/experiences.component';
import { EducationsComponent } from './educations/educations.component';
import { CompetencesComponent } from './competences/competences.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { CoursesComponent } from './courses/courses.component';
import { CertificatesComponent } from './certificates/certificates.component';
import { LanguagesComponent } from './languages/languages.component';
import {ExamsComponent} from "./exams/exams.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ProfilePageRoutingModule,
        NgOptimizedImage,
        FontAwesomeModule,
        LoadingIndicatorComponent,
        UserCardComponent,
        TranslocoDirective,
        ConnectivityErrorComponent,
        ExperiencesComponent,
        EducationsComponent,
        CompetencesComponent,
        BasicInfoComponent,
        CoursesComponent,
        CertificatesComponent,
        LanguagesComponent,
        ExamsComponent
    ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {
}
