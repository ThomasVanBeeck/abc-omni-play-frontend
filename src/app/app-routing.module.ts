import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserUtils } from '@azure/msal-browser';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule)
  },
  {
    path: 'fleet',
    loadChildren: () =>
      import('./pages/fleet/fleet.module').then((m) => m.FleetPageModule)
  },
  {
    path: 'profile/:user',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'vcard',
    loadChildren: () => import('./pages/vcard/vcard.module').then(m => m.VcardPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./common/auth/auth.module').then(m => m.AuthPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'colleagues',
    loadChildren: () => import('./pages/colleagues/colleagues.module').then(m => m.ColleaguesPageModule)
  },
  {
    path: 'charging',
    loadChildren: () => import('./pages/charging/charging.module').then(m => m.ChargingPageModule)
  },
  {
    path: 'news/:id',
    loadChildren: () => import('./pages/news-detail/news-details.module').then(m => m.NewsDetailsPageModule)
  },
  {
    path: 'events/:id',
    loadChildren: () => import('./pages/events/events.module').then(m => m.EventsPageModule)
  },
  {
    path: 'play',
    redirectTo: 'play/summary',
    pathMatch: 'full'
  },
  {
    path: 'play',
    loadChildren: () => import('./pages/play/play.module').then( m => m.PlayPageModule)
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? 'enabledNonBlocking'
          : 'disabled'
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
