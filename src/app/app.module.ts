import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TabsComponent } from './common/tabs/tabs.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { Capacitor } from '@capacitor/core';
import { OmniIconComponent } from './common/omni-icon/omni-icon.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { StorageService } from './services/storage/storage.service';
import { TranslocoRootModule } from './transloco-root.module';

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [AppComponent, TabsComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(
      {
        backButtonDefaultHref: '/home'
      }
    ),
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: environment.client_id, // Application (client) ID from the app registration
          authority:
            'https://login.microsoftonline.com/' + environment.tenant_id, // The Azure cloud instance and the app's sign-in audience (tenant ID, common, organizations, or consumers)
          redirectUri: Capacitor.isNativePlatform()
            ? environment.native_redirect_uri
            : environment.web_redirect_uri // This is your redirect URI
        },
        cache: {
          cacheLocation: 'localStorage',
          storeAuthStateInCookie: isIE // Set to true for Internet Explorer 11
        }
      }),
      {
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: [environment.api_scope]
        }
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          [
            `${environment.omni_profile.baseUrl}${environment.omni_profile.apiVersion}${environment.omni_profile.apiBasePath}/*`,
            [environment.api_scope]
          ],
          [
            `${environment.omni_fleet.baseUrl}${environment.omni_fleet.apiVersion}${environment.omni_fleet.apiBasePath}/*`,
            [environment.api_scope]
          ],
          [
            `${environment.omni_intranet.baseUrl}${environment.omni_intranet.apiVersion}${environment.omni_intranet.apiBasePath}/*`,
            [environment.api_scope]
          ],
          [
            `${environment.omni_play.baseUrl}${environment.omni_play.apiVersion}${environment.omni_play.apiBasePath}/*`,
            [environment.api_scope]
          ]
        ]),
        authRequest: (_, __, originalAuthRequest) => originalAuthRequest
      }
    ),
    OmniIconComponent,
    TranslocoRootModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard,
    StorageService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
