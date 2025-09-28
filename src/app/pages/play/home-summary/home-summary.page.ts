import { Component } from '@angular/core';
import { isPlatform } from '@ionic/core';
import { faQuestionCircle, faComputer, faInfoCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { PlayService } from 'src/app/services/play/play.service';
import { User } from 'src/app/models/user';
import { Observable, switchMap, forkJoin, map, of, filter, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-summary',
  templateUrl: './home-summary.page.html',
  styleUrls: ['../play.page.scss'],
})
export class HomeSummaryPage{

  constructor(private playService: PlayService, private route: ActivatedRoute ) {}

  activitiesPerPage: number = 5;

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
    tap(value => console.log('userInfo$ update:', value))
  );
 
  userActivitiesOpenFull$: Observable<any[]> = this.profileInfo$.pipe(
    filter((user): user is User => user !== null),
    switchMap(user => this.playService.getUserActivitiesOpenFull(Number(user.id), this.activitiesPerPage))
    );

    userActivitiesWithScores$: Observable<any[]> = this.profileInfo$.pipe(
      filter((user): user is User => user !== null),
      switchMap(user => this.playService.getUserActivitiesClosedAndScores(Number(user.id), this.activitiesPerPage))
    );
 
  faQuestionCircle = faQuestionCircle;
  faComputer = faComputer;
  faInfoCircle = faInfoCircle;
  faStar = faStar;
 
   protected readonly isPlatform = isPlatform;
 }