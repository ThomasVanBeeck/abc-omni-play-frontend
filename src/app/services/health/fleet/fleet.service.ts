import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { GenericHealthService } from '../generic-health-service';

@Injectable({
  providedIn: 'root'
})
export class FleetService extends GenericHealthService {
  private readonly FLEET_API = `${environment.omni_fleet.baseUrl}${environment.omni_fleet.apiVersion}${environment.omni_fleet.apiBasePath}`;

  constructor(private http: HttpClient) {
    super();
  }

  override isHealthy(): Observable<boolean> {
    return this.http.get<boolean>(`${this.FLEET_API}/health`).pipe(catchError(() => [false]));
  }
}
