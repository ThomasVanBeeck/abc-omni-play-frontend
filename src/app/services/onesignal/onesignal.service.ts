import { Injectable } from '@angular/core';
import OneSignal, {OSNotificationPermission} from "onesignal-cordova-plugin";
import {environment} from "../../../environments/environment";
import {AlertController} from "@ionic/angular";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, lastValueFrom, of} from "rxjs";
import {Preferences} from "@capacitor/preferences";

@Injectable({
  providedIn: 'root'
})
export class OnesignalService {

  constructor(private alertCtrl: AlertController, private http: HttpClient) {}

  async OneSignalInit() {
    OneSignal.Debug.setLogLevel(6)

    OneSignal.initialize(environment.onesignal.appId);

    OneSignal.Notifications.addEventListener('click', async (e) => {
      let clickData = await e.notification;
      console.log("Notification Clicked : " + clickData);
    })


    const permGiven = await OneSignal.Notifications.getPermissionAsync();
    if(!permGiven){
      await this.requestPermission();
      await this.setWantNotifications(true);
      OneSignal.setConsentGiven(true);
    }

    OneSignal.User.addEventListener('change', async (e) => {
      // alert(JSON.stringify(e));
    });
  }

  setOneSignalUserLanguage(lang: string) {
    OneSignal.User.setLanguage(lang);
  }

  async requestPermission() {
    try {
      const permission = await OneSignal.Notifications.requestPermission(true);
      if (!permission) {
        await this.requestPermission();
      }
    } catch (e) {
      throw e;
    }
  }

  login(uid: string) {
    OneSignal.login(uid);
  }

  logout() {
    OneSignal.logout();
  }

  setOneSignalUserCarId(carId: string) {
    OneSignal.User.addTag('carId', carId);
  }

  //onesignal
  createOneSignalUser(uid: string) {
    const app_id = environment.onesignal.appId;

    const body = {
      identity: {
        external_id: uid
      }
    };

    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Basic ${environment.onesignal.restApiKey}`);

    return this.http.post<any>(
      `https://onesignal.com/api/v1/apps/${app_id}/users`,
      body,
      {headers}
    );
  }

  checkOneSignalUserIdentity(uid: string) {
    const app_id = environment.onesignal.appId;

    const headers = new HttpHeaders()
      .set('accept', 'application/json')


    return this.http.get<any>(
      `https://onesignal.com/api/v1/apps/${app_id}/users/by/external_id/${uid}/identity`,
      {headers}
    )
      .pipe(
        catchError((e) => {
          return of(false);
        })
      );
  }

  // in case of unsubscribe event / when user switches off the notifications
  deleteOneSignalUser(uid: string) {
    const app_id = environment.onesignal.appId;

    const headers = new HttpHeaders()
      .set('accept', 'application/json')

    return this.http.delete<any>(
      `https://onesignal.com/api/v1/apps/${app_id}/users/by/external_id/${uid}`,
      {headers}
    )
      .pipe(
        catchError((e) => {
          return of(false);
        })
      );
  }

  async wantsToGetNotifications() {
    const { value } = await Preferences.get({key: 'allowNotifications'});
    return !!value ? value === 'true' : false;
  }

  async setWantNotifications(param: boolean) {
    await Preferences.set(
      {
        key: 'allowNotifications',
        value: param.toString()
      });
  }
}
