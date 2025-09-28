import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, isPlatform } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PlayService } from 'src/app/services/play/play.service';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { faComputer, faInfoCircle, faQuestionCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, switchMap, tap, scan } from 'rxjs';
import { User } from 'src/app/models/user';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-browse-users',
  templateUrl: './browse-users.page.html',
  styleUrls: ['../play.page.scss'],
})
export class BrowseUsersPage {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  faQuestionCircle = faQuestionCircle;
  faComputer = faComputer;
  faInfoCircle = faInfoCircle;
  faStar = faStar;

  itemsPerPage: number = 25;
  pageTrigger$ = new BehaviorSubject<number>(0);
  hasMoreData = true;

  userInfo$: Observable<User | null> = this.route.paramMap.pipe(
    switchMap(params => {
      const id = params.get('id');
      if (id) {
        return this.playService.getUserById(Number(id));
      } else {
        return this.playService.getGlobalUser();
      }
    })
  );

  usersInfo$: Observable<User[]> = this.pageTrigger$.pipe(
    switchMap(page =>
      this.playService.getAllUsers(this.itemsPerPage, page).pipe(
        tap(users => {
          if (users.length < this.itemsPerPage) {
            this.hasMoreData = false;
            if (this.infiniteScroll) {
              this.infiniteScroll.disabled = true;
            }
          }
        })
      )
    ),
    scan((acc: User[], users: User[]) => {
      if (this.pageTrigger$.value === 0) {
        return users;
      } else {
        return [...acc, ...users];
      }
    }, [])
  );

  constructor(private playService: PlayService, private route: ActivatedRoute, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.resetUsers();
      });
  }

  loadData(event: IonInfiniteScrollCustomEvent<void>) {
    if (!this.hasMoreData) {
      event.target.disabled = true;
      return;
    }

    this.pageTrigger$.next(this.pageTrigger$.value + 1);
    setTimeout(() => event.target.complete(), 200);
  }

  resetUsers() {
    this.hasMoreData = true;
    if (this.infiniteScroll) {
      this.infiniteScroll.disabled = false;
    }
    this.pageTrigger$.next(0); // Reset de pagina
  }

  protected readonly isPlatform = isPlatform;
}
