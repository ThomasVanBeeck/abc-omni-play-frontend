import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { GenericHealthService } from '../generic-health-service';

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends GenericHealthService {
  private readonly PEOPLE_API = `${environment.omni_profile.baseUrl}${environment.omni_profile.apiVersion}${environment.omni_profile.apiBasePath}`;

  constructor(private http: HttpClient) {
    super();
  }

  override isHealthy(): Observable<boolean> {
    return this.http.get<boolean>(`${this.PEOPLE_API}/health`).pipe(catchError(() => [false]));
  }
}
