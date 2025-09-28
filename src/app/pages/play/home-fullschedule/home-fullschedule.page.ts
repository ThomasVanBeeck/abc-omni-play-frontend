import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, isPlatform } from '@ionic/angular';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { faInfoCircle, faStar, faQuestionCircle, faComputer } from '@fortawesome/free-solid-svg-icons';
import { PlayService } from 'src/app/services/play/play.service';
import { User } from 'src/app/models/user';
import { BehaviorSubject, Observable, switchMap, scan, tap, concatMap, filter } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-fullschedule',
  templateUrl: './home-fullschedule.page.html',
  styleUrls: ['../play.page.scss'],
})
export class HomeFullschedulePage {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  constructor(private playService: PlayService, private route: ActivatedRoute) { }

  faQuestionCircle = faQuestionCircle;
  faComputer = faComputer;
  faInfoCircle = faInfoCircle;
  faStar = faStar;
  
  itemsPerPage: number = 25;
  pageTrigger$ = new BehaviorSubject<number>(0);
  hasMoreData = true;

  userInfo$: Observable<User | null> = this.playService.getGlobalUser();

  profileInfo$: Observable<User | null> = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id');
      if (id) {
        return this.playService.getUserById(Number(id));
      } else {
        return this.playService.getGlobalUser();
      }
    }),
    filter((user): user is User => user !== null)
  );

  userActivitiesOpenFull$: Observable<any[]> = this.profileInfo$.pipe(
    filter((user): user is User => user !== null),
    switchMap(user =>
      this.pageTrigger$.pipe(
        switchMap(page => this.playService.getUserActivitiesOpenFull(Number(user.id), this.itemsPerPage, page)),
        tap(activities => {
          if (activities.length < this.itemsPerPage) {
            this.hasMoreData = false;
            if (this.infiniteScroll) {
              this.infiniteScroll.disabled = true;
            }
          }
        }),
        scan((acc: any[], activities: any[]) => [...acc, ...activities], [])
      )
    )
  );

  loadData(event: IonInfiniteScrollCustomEvent<void>) {
    if (!this.hasMoreData) {
      event.target.disabled = true;
      return;
    }

    this.pageTrigger$.next(this.pageTrigger$.value + 1);
    setTimeout(() => event.target.complete(), 500);
  }

  protected readonly isPlatform = isPlatform;
}
