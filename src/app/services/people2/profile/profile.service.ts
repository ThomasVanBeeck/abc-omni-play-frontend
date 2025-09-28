import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profile } from '../../../models/profile';
import { ProfilePicture } from '../../../models/profile-picture';
import { environment } from '../../../../environments/environment';
import { EmployeeProfile } from '../../../models/employee-profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly PROFILE_API = `${environment.omni_profile.baseUrl}${environment.omni_profile.apiVersion}${environment.omni_profile.apiBasePath}`;

  constructor(private http: HttpClient) {
  }

  getMyProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.PROFILE_API}/user-info/me`);
  }

  getMyProfilePicture(): Observable<ProfilePicture> {
    return this.http.get<ProfilePicture>(
      `${this.PROFILE_API}/user-info/me/picture`
    );
  }

  getUserProfile(userId: string): Observable<Profile> {
    return this.http.get<Profile>(`${this.PROFILE_API}/user-info/${userId}`);
  }

  getUserProfilePicture(userId: string): Observable<ProfilePicture | null> {
    return this.http.get<ProfilePicture>(
      `${this.PROFILE_API}/user-info/${userId}/picture`
    );
  }

  getUserProfileDetails(userId: string): Observable<EmployeeProfile> {
    return this.http.get<EmployeeProfile>(`${this.PROFILE_API}/user-info/${userId}/details`);
  }
}
