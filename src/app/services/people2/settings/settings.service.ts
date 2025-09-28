import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { People2Settings } from '../../../models/people2-settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private readonly SETTINGS_API = `${environment.omni_profile.baseUrl}${environment.omni_profile.apiVersion}${environment.omni_profile.apiBasePath}/settings`;
  private People2Settings: Observable<People2Settings> | undefined;

  constructor(private http: HttpClient) {
  }

  getSettings(): Observable<People2Settings> {
    if (!this.People2Settings) {
      this.People2Settings = this.fetchSettings();
    }
    return this.People2Settings!;
  }

  private fetchSettings(): Observable<People2Settings> {
    return this.http.get<People2Settings>(`${this.SETTINGS_API}`);
  }

}
