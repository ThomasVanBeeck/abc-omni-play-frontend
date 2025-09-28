import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, Observable, filter, switchMap, catchError, of, finalize } from 'rxjs';
import { Page } from 'src/app/models/page';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ActivityDetailed } from 'src/app/models/activity_detailed';
import { ActivityType } from 'src/app/models/activity_type';
import { ActivityScoreForm } from 'src/app/models/activity_scoreform';
import { XpMapping } from 'src/app/models/xp_mapping';

@Injectable({
  providedIn: 'root'
})
  
export class PlayService {

  
  private readonly PLAY_API = `${environment.omni_play.baseUrl}${environment.omni_play.apiVersion}${environment.omni_play.apiBasePath}`;
  
  private globalUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  
  constructor(private http: HttpClient) { }
  
  getGlobalUser(refresh: boolean = false): Observable<User | null> {
      console.log("getglobaluser triggered.");
      const url = `${this.PLAY_API}/user/`;
      this.http.get<User>(url).pipe(
        tap(user => this.globalUserSubject.next(user)),
        catchError(err => {
          console.error("Failed to fetch global user:", err);
          return of(null);
        })
      ).subscribe();
    
    return this.globalUserSubject.asObservable();
  }
  
  getUserInfo(route: ActivatedRoute): Observable<User | null> {
    return route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return id ? this.getUserById(Number(id)) : this.getGlobalUser();
      }),
      catchError(err => {
        console.error("Failed to fetch user info:", err);
        return of(null);
      })
    );
  }
  
  getUserById(id: number): Observable<User | null> {
    const url = `${this.PLAY_API}/user/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(err => {
        console.error(`User with id ${id} not found:`, err);
        return of(null);

      }),
      finalize(() => console.log('getUserById is afgerond'))
    );
  }

  getAllUsers(size: number, page: number = 0): Observable<any[]> {
    const url = `${this.PLAY_API}/user/all?page=${page}&size=${size}&sort=firstName,asc&sort=lastName,asc`;
    return this.http.get<Page<any>>(url).pipe(
      map(response => response.content)
    );
  }

  getAllUsersByXP(size: number, page: number = 0): Observable<any[]> {
    const url = `${this.PLAY_API}/user/all?page=${page}&size=${size}&sort=experiencePoints,desc&sort=firstName,asc&sort=lastName,asc`;
    return this.http.get<Page<any>>(url).pipe(
      map(response => response.content)
    );
  }

  getDetailedActivityById(id: number): Observable<ActivityDetailed> {
    const url = `${this.PLAY_API}/activity/detailed/${id}`;
    return this.http.get<ActivityDetailed>(url);
  }

  getScoreFormById(id: number): Observable<ActivityScoreForm> {
    const url = `${this.PLAY_API}/activity/scoreform/${id}`;
    return this.http.get<ActivityScoreForm>(url);
  }

  getUserActivitiesOpenFull(userid: number, itemsPerPage: number, page: number = 0): Observable<any[]> {
    const url = `${this.PLAY_API}/activity/user-open-full/${userid}?page=${page}&size=${itemsPerPage}&sort=activityDate,asc`;
    return this.http.get<Page<any>>(url).pipe(
      map(response => response.content)
    );
  }

  getUserActivitiesClosedAndScores(userid: number, itemsPerPage: number, page: number = 0): Observable<any[]> {
    const url = `${this.PLAY_API}/activity/user-closed-scores/${userid}?page=${page}&size=${itemsPerPage}&sort=activityDate,desc`;
    return this.http.get<Page<any>>(url).pipe(
      map(response => response.content)
    );
  }

  getAllUpcomingActivities(itemsPerPage: number, page: number = 0): Observable<any[]> {
    const url = `${this.PLAY_API}/activity/all-upcoming/?page=${page}&size=${itemsPerPage}&sort=activityDate,asc`;
    return this.http.get<Page<any>>(url).pipe(
      map(response => response.content)
    );
  }

  joinActivity(userId: number, activityId: number): Observable<any> {
    console.log("service joinActivity POST activated");
    console.log(`userId: ${userId}`)
    return this.http.post(`${this.PLAY_API}/activity/${activityId}/join`, userId);
  }

  leaveActivity(userId: number, activityId: number): Observable<any> {
    console.log("service leaveActivity POST activated");
    return this.http.post(`${this.PLAY_API}/activity/${activityId}/leave`, userId);
  }

  newActivity(bodyData: any): Observable<any> {
    console.log("service newActivity POST activated");
    console.log(`ACTIVITY CONTENT: ${bodyData}`);
    return this.http.post(`${this.PLAY_API}/activity/new`, bodyData);
  }

  postScores(activityId: number, bodyData: any): Observable<any> {
    console.log("service postScores POST activated");
    return this.http.post(`${this.PLAY_API}/score/${activityId}`, bodyData);
  }

  editActivity(activityId: number, bodyData: any): Observable<any> {
    console.log("service editActivity POST activated");
    console.log(`ACTIVITY CONTENT: ${bodyData}`);
    return this.http.put(`${this.PLAY_API}/activity/${activityId}/edit`, bodyData);
  }

  cancelActivity(activityId: number): Observable<any> {
    console.log("service cancelActivity POST activated");
    return this.http.patch(`${this.PLAY_API}/activity/${activityId}`, { status: 'CANCELLED'});
  }

  getActivityTypes(): Observable<ActivityType[]> {
    console.log("service activity types GET activated");
    const url = `${this.PLAY_API}/activity-types/`;
    return this.http.get<ActivityType[]>(url);
  }

  getXpMappings(): Observable<XpMapping[]> {
    const url = `${this.PLAY_API}/xp-mappings/?sort=id,asc`; 
    return this.http.get<XpMapping[]>(url);
  }

  kickUserFromActivity(userId: number, activityId: number): Observable<any> {
    console.log("service kick user from activity POST activated");
    return this.http.post(`${this.PLAY_API}/activity/${activityId}/kick-user`, userId);
  }

  changeRoleToAdmin(userId: number) {
    console.log(`changeRoleToAdmin service function triggered for userId ${userId}`);
    const payload = { appRole: 'ADMIN' };
    return this.http.patch(`${this.PLAY_API}/user/${userId}`, payload);
  }

  changeRoleToUser(userId: number) {
    console.log(`changeRoleToUser service function triggered for userId ${userId}`);
    const payload = { appRole: 'USER' };
    return this.http.patch(`${this.PLAY_API}/user/${userId}`, payload);    
  }

  editXpMappings(bodyData: any) {
    return this.http.patch(`${this.PLAY_API}/xp-mappings/`, bodyData)
  }
}