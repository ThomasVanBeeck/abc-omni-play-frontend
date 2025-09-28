import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, isPlatform } from '@ionic/angular';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { faComputer, faInfoCircle, faQuestionCircle, faStar} from '@fortawesome/free-solid-svg-icons';
import { PlayService } from 'src/app/services/play/play.service';
import { User } from 'src/app/models/user';
import { BehaviorSubject, Observable, switchMap, filter } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-fullhistory',
  templateUrl: './home-fullhistory.page.html',
  styleUrls: ['../play.page.scss'],
})
export class HomeFullhistoryPage {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  constructor(private playService: PlayService, private route: ActivatedRoute) {}

  activitiesPerPage: number = 25;
  pageTrigger$ = new BehaviorSubject<number>(0);
  faQuestionCircle = faQuestionCircle;
  faComputer = faComputer;
  faInfoCircle = faInfoCircle;
  faStar = faStar;

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
  
  userActivitiesWithScores$: Observable<any[]> = this.profileInfo$.pipe(
    filter((user): user is User => user !== null),
    switchMap(user => this.playService.getUserActivitiesClosedAndScores(Number(user.id), this.activitiesPerPage))
  );

  loadData(event: IonInfiniteScrollCustomEvent<void>) {
    if (!this.hasMoreData) {
      event.target.disabled = true;
      return;
    }

    this.pageTrigger$.next(this.pageTrigger$.value + 1);
    setTimeout(() => event.target.complete(), 200);
  }

  protected readonly isPlatform = isPlatform;
}