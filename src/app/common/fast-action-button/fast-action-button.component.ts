import { Component } from '@angular/core';
import { faCarBurst, faChargingStation, faClock, faUserDoctor } from '@fortawesome/free-solid-svg-icons';
import { FleetService } from '../../services/fleet/fleet.service';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgForOf } from '@angular/common';
import { TranslocoDirective } from '@jsverse/transloco';
import { SettingsService } from '../../services/people2/settings/settings.service';

@Component({
  selector: 'app-fast-action-button',
  templateUrl: './fast-action-button.component.html',
  styleUrls: ['./fast-action-button.component.scss'],
  imports: [
    IonicModule,
    FaIconComponent,
    NgForOf,
    TranslocoDirective
  ],
  standalone: true
})
export class FastActionButtonComponent {

  constructor(private fleetService: FleetService, private router: Router) {
  }


  fastActions = [
    {
      title: 'insurance',
      handlerOnClick: () => this.handleCarCrashClick(),
      icon: faCarBurst
    },
    {
      title: 'doctor',
      handlerOnClick: () => this.handleDoctorClick(),
      icon: faUserDoctor
    },
    {
      title: 'timesheet',
      handlerOnClick: () => this.handleTimeSheetClick(),
      icon: faClock
    },
    {
      title: 'charging',
      handlerOnClick: () => this.handleChargingClick(),
      icon: faChargingStation
    }
  ];

  async handleTimeSheetClick() {
    alert('Not implemented yet handleTimeSheetClick');
  }

  async handleDoctorClick() {
    alert('Not implemented yet handleDoctorClick');
  }

  async handleCarCrashClick() {
    const fleetCar = await this.fleetService.getFleetCar();

    if (fleetCar && 'owner' in fleetCar) {
      if (!fleetCar.insuranceAgent?.length) {
        alert('No insurance agent found, please contact your fleet manager');
        return;
      }

      if (Capacitor.isNativePlatform()) {
        await Browser.open({ url: `https://www.google.com/search?q=${fleetCar.insuranceAgent}+telefoon+nummer+verzekering` });
      } else {
        window.open(`https://www.google.com/search?q=${fleetCar.insuranceAgent}+telefoon+nummer+verzekering`, '_self');
      }
    } else if (fleetCar && 'leasingCompany' in fleetCar) {
      if (Capacitor.isNativePlatform()) {
        await Browser.open({ url: `tel:${fleetCar.leasingCompany.telephone}` });
      } else {
        window.open(`tel:${fleetCar.leasingCompany.telephone}`, '_self');
      }
    }
  }

  async handleChargingClick() {
    await this.router.navigate(['/charging']);
  }
}
