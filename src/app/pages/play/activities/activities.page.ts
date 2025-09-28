import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, isPlatform } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PlayService } from 'src/app/services/play/play.service';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { faComputer, faInfoCircle, faQuestionCircle, faStar} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, switchMap, tap, scan } from 'rxjs';
import { User } from 'src/app/models/user';
import { Activity } from 'src/app/models/activity';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['../play.page.scss'],
})
export class ActivitiesPage {
      @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  constructor(
    private playService: PlayService,
  private router: Router) {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.resetActivities();
    });
   }

  faQuestionCircle = faQuestionCircle;
  faComputer = faComputer;
  faInfoCircle = faInfoCircle;
  faStar = faStar;

  itemsPerPage: number = 25;
  pageTrigger$ = new BehaviorSubject<number>(0);
  hasMoreData = true;

  userInfo$: Observable<User | null> = this.playService.getGlobalUser();

  activitiesInfo$: Observable<Activity[]> = this.pageTrigger$.pipe(
    switchMap(page =>
      this.playService.getAllUpcomingActivities(this.itemsPerPage, page).pipe(
        tap(activities => {
          if (activities.length < this.itemsPerPage) {
            this.hasMoreData = false;
            if (this.infiniteScroll) {
              this.infiniteScroll.disabled = true;
            }
          }
        }),

        map(activities => ({ page, activities }))
      )
    ),
    scan((acc: Activity[], val: { page: number; activities: Activity[] }) => {
      return val.page === 0 ? val.activities : [...acc, ...val.activities];
    }, [])
  );

  loadData(event: IonInfiniteScrollCustomEvent<void>) {
    if (!this.hasMoreData) {
      event.target.disabled = true;
      return;
    }

    this.pageTrigger$.next(this.pageTrigger$.value + 1);
    setTimeout(() => event.target.complete(), 200);
  }

  resetActivities() {
    this.hasMoreData = true;
    if (this.infiniteScroll) {
      this.infiniteScroll.disabled = false;
    }
    this.pageTrigger$.next(0);
  }

  protected readonly isPlatform = isPlatform;
}