// generic health service
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericHealthService {
  isHealthy(): Observable<boolean> {
    return new Observable<boolean>();
  }
}
