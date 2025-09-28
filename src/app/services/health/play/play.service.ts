import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError, Observable, of } from 'rxjs';
import { GenericHealthService } from '../generic-health-service';

@Injectable({
  providedIn: 'root'
})
export class PlayService extends GenericHealthService {

  private readonly PLAY_API = `${environment.omni_play.baseUrl}`;

  constructor(private http: HttpClient) {
    super();
  }

  override isHealthy(): Observable<boolean> {
    return this.http.get<{ status: string }>(`${this.PLAY_API}/status/health`).pipe(
      map(response => {
        console.log(response); // Log de JSON-response naar de console
        return response.status === 'UP';
      }),
      catchError(() => of(false))
    );
  }
}
