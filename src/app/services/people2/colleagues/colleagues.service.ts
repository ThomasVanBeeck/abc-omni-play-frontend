import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Profile} from "../../../models/profile";
import {HttpClient} from "@angular/common/http";
import {BirthdayProfile} from "../../../models/birthday-profile";

@Injectable({
  providedIn: 'root'
})
export class ColleaguesService {
  private readonly COLLEAGUES_API = `${environment.omni_profile.baseUrl}${environment.omni_profile.apiVersion}${environment.omni_profile.apiBasePath}`;

  constructor(private http: HttpClient) { }

  getColleagues(userId: string): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.COLLEAGUES_API}/user-info/users`);
  }

  getBirthdayList(): Observable<BirthdayProfile[]> {
    return this.http.get<BirthdayProfile[]>(`${this.COLLEAGUES_API}/user-info/birthdays`);
  }
}
