import {NavigationClient} from "@azure/msal-browser";
import {Capacitor} from "@capacitor/core";
import {InAppBrowser} from "@awesome-cordova-plugins/in-app-browser";
import {Injectable} from "@angular/core";
import {Platform} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class CustomNavigationClient extends NavigationClient {

  constructor(public platform: Platform) {
    super();
  }

  override async navigateExternal(url: string, options: any) {
    if (Capacitor.isNativePlatform()) {
      const browser = InAppBrowser.create(url, '_blank', {
        location: 'yes',
        clearcache: 'yes',
        clearsessioncache: 'yes',
        hidenavigationbuttons: 'yes',
        hideurlbar: 'yes',
        fullscreen: 'yes'
      });
      browser.on('loadstart').subscribe(async event => {
        if (event.url.includes('#code')) {
          // Close the in app browser and redirect to localhost + the state parameter
          browser.close();
          const domain = event.url.split('#')[0];
          const url = event.url.replace(domain, "auth");
          await this.platform.ready();
          window.location.href = url;
        }
      });
    } else {
      if (options.noHistory) {
        window.location.replace(url);
      } else {
        window.location.assign(url);
      }
    }
    return true;
  }
}
