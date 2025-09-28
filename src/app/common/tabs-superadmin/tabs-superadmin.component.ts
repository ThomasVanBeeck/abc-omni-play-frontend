import { Component, OnDestroy, OnInit } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-tabs-superadmin',
  templateUrl: './tabs-superadmin.component.html',
  styleUrls: ['../../pages/play/play.page.scss'],
  
  imports: [IonButton],
})
export class TabsSuperadminComponent  implements OnInit {
currentRoute: string = '';
  activeTab: string = 'superadmin-admins';
  private routeSubscription: Subscription | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {

    this.routeSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentRoute = this.router.url;
      });
  }

  ngOnDestroy() {

    this.routeSubscription?.unsubscribe();
  }

  isActiveRoute(route: string): boolean {
    return this.currentRoute === route;
  }

  navigateTo(tab: string) {
      this.activeTab = `${tab}`;
      this.router.navigate([`/play/${tab}`]);
  }
}
