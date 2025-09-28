import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AccountInfo } from '@azure/msal-browser';
import { PeopleService } from '../../services/health/people/people.service';
import { FleetService } from "../../services/health/fleet/fleet.service";
import { PlayService } from 'src/app/services/health/play/play.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  user: AccountInfo | null = null;

  constructor(private authService: AuthService, public peopleService: PeopleService, public fleetHeathService: FleetService, public playService: PlayService) {
  }

  ngOnInit() {
    this.user = this.authService.getLoggedInUser();
    this.isPeopleAvailable();
  }

  isLoggedIn() {
    return this.authService.getLoggedInUser() !== null;
  }

  isPlayAvailable() {
    return this.playService.isHealthy();
  }

  isPeopleAvailable() {
    return this.peopleService.isHealthy();
  }

  isFleetAvailable() {
    return this.fleetHeathService.isHealthy();
  }
}
