import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {VCard} from "../../../models/v-card";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VCardService {
  private readonly VCARD_API = `${environment.omni_profile.baseUrl}${environment.omni_profile.apiVersion}${environment.omni_profile.apiBasePath}`

  constructor(private http: HttpClient) {
  }

  getMyVCard(): Observable<VCard> {
    return this.http.get<VCard>(`${this.VCARD_API}/vcard/generate`);
  }

}
