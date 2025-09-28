import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {MsalService} from "@azure/msal-angular";
import {AccountInfo} from "@azure/msal-browser";
import {environment} from "../../../environments/environment";
import {CustomNavigationClient} from "../../util/custom.navigation.client";
import {Platform} from "@ionic/angular";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accessTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private msalService: MsalService, platform: Platform, private router: Router) {
    this.msalService.instance.setNavigationClient(new CustomNavigationClient(platform));
    this.msalService.handleRedirectObservable().subscribe({
      next: value => {
        if (!value) {
          return
        }
        this.accessTokenSubject.next(value.accessToken);
      },
      error: error => {
        console.error('Error:', error.message);
      },
    });
  }

  getAccessToken(): Observable<string | null> {
    return this.accessTokenSubject.asObservable();
  }

  setLoggedInUser() {
    this.msalService.instance.setActiveAccount(this.msalService.instance.getAllAccounts()[0]);
  }

  getLoggedInUser(): AccountInfo | null {
    return this.msalService.instance.getActiveAccount();
  }

  login = async () => {
    this.msalService.handleRedirectObservable().subscribe((authResult) => {
      if (authResult) {
        this.msalService.instance.setActiveAccount(authResult.account);
      } else {
        this.msalService.instance.loginRedirect();
      }
    });
  }

  silentLogin = async () => {
    await this.msalService.instance.initialize();
    this.msalService.acquireTokenSilent({
      scopes: [environment.api_scope]
    }).subscribe((authResult) => {
      if (authResult) {
        this.msalService.instance.setActiveAccount(authResult.account);
      } else {
        this.msalService.instance.loginRedirect();
      }
    });
  }

  async init() {
    this.msalService.initialize();
  }

  async logout() {
    await this.msalService.instance.logoutRedirect({account: this.getLoggedInUser(), postLogoutRedirectUri: "/"});
  }
}
