import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {Capacitor} from "@capacitor/core";
import {lastValueFrom} from "rxjs";
import {OnesignalService} from "../../services/onesignal/onesignal.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isIframe = false;
  prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  constructor(private authService: AuthService, private router: Router, private oneSignalService: OnesignalService) {
  }

  ngOnInit() {
    this.isIframe = window !== window.parent && !window.opener;
    const user = this.authService.getLoggedInUser();
    if (!user) {
      this.authService.getAccessToken().subscribe(async value => {
        if (!value) {
          return;
        }
        this.authService.setLoggedInUser();
        const userLoggedIn = this.authService.getLoggedInUser();
        if(Capacitor.isNativePlatform()) {
          if(userLoggedIn && userLoggedIn.username) {
            await this.oneSignalService.requestPermission(); // android forgets to ask once it is opened by shortcut appearntly?
            try {
              const response = await lastValueFrom(this.oneSignalService.checkOneSignalUserIdentity(userLoggedIn.username));

              if(!response) {
                await lastValueFrom(this.oneSignalService.createOneSignalUser(userLoggedIn.username));
                await this.oneSignalService.setWantNotifications(true);
              }
              const wantsNotifications = await this.oneSignalService.wantsToGetNotifications();
              if(wantsNotifications) this.oneSignalService.login(userLoggedIn.username);
            } catch(e) {
              console.log(e);
            }
          }
        }
        await this.router.navigateByUrl('/home');
      });
    }
  }

  login() {
    this.authService.login().then()
  }

}
