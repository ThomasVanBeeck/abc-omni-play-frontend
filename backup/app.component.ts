import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { register } from 'swiper/element/bundle';
import { OnesignalService } from './services/onesignal/onesignal.service';
import { Capacitor } from '@capacitor/core';
import { lastValueFrom } from 'rxjs';

register();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  hideHeaderFooter:boolean = false;

  constructor(platform: Platform, private router: Router, protected authService: AuthService, private oneSignalService: OnesignalService) {
    platform.ready().then(async () => {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          // Check the current route URL and decide if you want to hide the header/footer
          this.hideHeaderFooter = event.url.includes('/play');
        }
      });
      if(Capacitor.isNativePlatform()) {
        await this.oneSignalService.OneSignalInit();
      }
      const user = authService.getLoggedInUser();
      if (!user) {
        await this.router.navigateByUrl('/login');
      } else {
        await authService.silentLogin().then(async () => {
          if(Capacitor.isNativePlatform()) {
            if(user && user.username) {
              await this.oneSignalService.requestPermission(); // android forgets to ask once it is opened by shortcut appearntly?
              try {
                const response = await lastValueFrom(this.oneSignalService.checkOneSignalUserIdentity(user.username));

                if(!response) {
                  await lastValueFrom(this.oneSignalService.createOneSignalUser(user.username));
                  await this.oneSignalService.setWantNotifications(true);
                }

                const wantsNotifications = await this.oneSignalService.wantsToGetNotifications();
                if(wantsNotifications) this.oneSignalService.login(user.username);
              } catch(e) {
                console.log(e);
              }
            }
          }
        });
      }
    });
  }

}
