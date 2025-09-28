import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../../models/event';
import {NewsItem, NewsItemDetails, NewsResponse} from "../../models/news";

@Injectable({
  providedIn: 'root'
})
export class IntranetServiceService {
  private readonly INTRANET_API = `${environment.omni_intranet.baseUrl}${environment.omni_intranet.apiVersion}${environment.omni_intranet.apiBasePath}`;

  constructor(private http: HttpClient) {
  }

  fetchAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.INTRANET_API}/events`);
  }

  fetchFutureEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.INTRANET_API}/events/future`);
  }

  fetchEventById(id: string | null): Observable<Event> {
    return this.http.get<Event>(`${this.INTRANET_API}/events/${id}`);
  }

  fetchAllNews(): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(`${this.INTRANET_API}/news`);
  }

  fetchNewsById(id: string): Observable<NewsItemDetails> {
    return this.http.get<NewsItemDetails>(`${this.INTRANET_API}/news/${id}`);
  }

  respondGoing(eventId: string): Observable<any> {
    return this.http.post(`${this.INTRANET_API}/events/respond-going?eventId=${eventId}`, {});
  }

  respondNotGoing(eventId: string): Observable<any> {
    return this.http.post(`${this.INTRANET_API}/events/respond-not-going?eventId=${eventId}`, {});
  }


}
