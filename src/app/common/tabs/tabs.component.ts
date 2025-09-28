import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faCog, faIdBadge, faHomeUser, faTableTennis, faChartLine, faUsers} from '@fortawesome/free-solid-svg-icons';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  // Hier kun je iconen of andere dynamische waarden toevoegen
  faCog = faCog;
  faIdBadge = faIdBadge;
  faHomeUser = faHomeUser;
  faTableTennis = faTableTennis;
  faChartLine = faChartLine;
  faUsers = faUsers;

  
  isPlayRoute: boolean = false;  // Dit geeft aan of we op de '/play' route zitten

  constructor(private router: Router, private navCtrl: NavController) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Controleer of de huidige route '/play' is
        this.isPlayRoute = event.url.includes('/play');
      }
    });
  }

  navigate(path: string) {
    this.navCtrl.navigateForward('/' + path);
  }
}
