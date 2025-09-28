import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { isPlatform } from '@ionic/core';
import { TranslocoService } from '@jsverse/transloco';
import { OnesignalService } from '../../services/onesignal/onesignal.service';
import { Capacitor } from '@capacitor/core';
import { FleetService } from '../../services/fleet/fleet.service';
import { ProfileService } from '../../services/people2/profile/profile.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss']
})
export class SettingsPage {

  defaultLanguage = this.transService.getDefaultLang();
  allLanguagesAvailable = this.transService.getAvailableLangs() as string[];

  allowNotifications: boolean | undefined;
  muteSettingsLoading = true;

  constructor(private authService: AuthService, private router: Router, private transService: TranslocoService, private oneSignalService: OnesignalService, private fleetService: FleetService, private peopleService: ProfileService) {
    this.defaultLanguage = this.transService.getActiveLang();
    this.allLanguagesAvailable = this.transService.getAvailableLangs() as string[];

    if (Capacitor.isNativePlatform())
      this.oneSignalService.setOneSignalUserLanguage(this.defaultLanguage);

    const user = this.authService.getLoggedInUser();
    if (user && user.username) {
      this.oneSignalService.wantsToGetNotifications().then((wantsToGetNotifications) => {
        this.allowNotifications = wantsToGetNotifications;
        this.muteSettingsLoading = false;
      });
    }
  }

  async logout() {
    await this.authService.logout();
    this.oneSignalService.logout();
  }

  setActiveLanguage(event: Event) {
    this.defaultLanguage = (event.target as HTMLInputElement).value;
    this.transService.setActiveLang(this.defaultLanguage);
  }

  setLanguage(language: string) {
    this.defaultLanguage = language;
    this.transService.setActiveLang(this.defaultLanguage);
  }

  async setMuteSettings(event: Event) {
    this.allowNotifications = (event.target as HTMLInputElement).checked;
    const user = this.authService.getLoggedInUser();
    if (user && user.username) {
      if (this.allowNotifications) {
        await this.oneSignalService.setWantNotifications(true);
        this.oneSignalService.login(user.username);
      } else {
        await this.oneSignalService.setWantNotifications(false);
        this.oneSignalService.logout();
      }
    }
  }

  protected readonly isPlatform = isPlatform;
  protected readonly JSON = JSON;
  protected readonly Capacitor = Capacitor;
}
