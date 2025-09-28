import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  FleetCarAttachment, FleetCarAttachmentDetail,
  FleetCompanyCar,
  FleetDriver,
  FleetLeasingCar, InputCarImg,
} from '../../models/fleet';
import { environment } from '../../../environments/environment';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class FleetService {
  private readonly FLEET_API = `${environment.omni_fleet.baseUrl}${environment.omni_fleet.apiVersion}${environment.omni_fleet.apiBasePath}/fleet-info`;

  constructor(private http: HttpClient, private fleetStore: StorageService) {}

  async setFleetCarAttachments(attachments: FleetCarAttachment[]) {
    return this.fleetStore.set('fleetCarAttachments', JSON.stringify(attachments));
  }

  async getFleetCarAttachments() {
    const fleetCarAttachments = await this.fleetStore.get(
      'fleetCarAttachments'
    );
    return fleetCarAttachments
      ? (JSON.parse(fleetCarAttachments) as FleetCarAttachment[])
      : undefined;
  }

  async setFleetCar(car: FleetCompanyCar | FleetLeasingCar) {
    return this.fleetStore.set('fleetCar', JSON.stringify(car));
  }

  async getFleetCar() {
    const fleetCar = await this.fleetStore.get('fleetCar');
    return fleetCar
      ? (JSON.parse(fleetCar) as FleetCompanyCar | FleetLeasingCar)
      : undefined;
  }

  getFleetCarDetailsById(carId: string) {
    const carDetailsEndpoint = '/car';
    carId = encodeURIComponent(carId);
    return this.http.get<FleetCompanyCar | FleetLeasingCar>(
      `${this.FLEET_API}${carDetailsEndpoint}?id=${carId}`
    );
  }

  getMyFleetDriverDetails() {
    const driverDetailsEndpoint = '/me';
    return this.http.get<FleetDriver>(
      `${this.FLEET_API}${driverDetailsEndpoint}`
    );
  }

  getFleetCarAttachmentsByCarId(carId: string) {
    const carAttachmentsEndpoint = '/car/attachments';
    carId = encodeURIComponent(carId);
    return this.http.get<FleetCarAttachment[]>(
      `${this.FLEET_API}${carAttachmentsEndpoint}?id=${carId}`
    );
  }

  getFleetCarAttachmentByUrl(attachmentId: string, carId: string) {
    const carAttachmentEndpoint = `/car/${carId}/attachments/${attachmentId}`
    return this.http.get<FleetCarAttachmentDetail>(
      `${this.FLEET_API}${carAttachmentEndpoint}`
    )
  }

  getDynamicCarImageFromImg(options: InputCarImg) {
    const { brand, model, carYear, key, angle, width, zoomLevel } = options;
    return this.http.get(
      `https://cdn.imagin.studio/getImage?make=${brand}&angle=${angle}&modelFamily=${model}&zoomLevel=${zoomLevel}&width=${width}&modelYear=${carYear}&customer=${key}&modelVariant=ES`,
      {
        responseType: 'blob',
      }
    );
  }
}
