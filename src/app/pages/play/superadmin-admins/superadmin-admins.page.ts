
import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, isPlatform, AlertController} from '@ionic/angular';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PlayService } from 'src/app/services/play/play.service';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { faComputer, faInfoCircle, faQuestionCircle, faArrowDown, faArrowUp, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, switchMap, tap, scan, combineLatest } from 'rxjs';
import { User } from 'src/app/models/user';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-superadmin-admins',
  templateUrl: './superadmin-admins.page.html',
  styleUrls: ['../play.page.scss'],
})
export class SuperadminAdminsPage {
    @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;
  
    faQuestionCircle = faQuestionCircle;
    faComputer = faComputer;
    faInfoCircle = faInfoCircle;
    faAnglesUp = faArrowUp;
    faAnglesDown = faArrowDown;
    faSuper = faUserGraduate;
    itemsPerPage: number = 25;
    pageTrigger$ = new BehaviorSubject<number>(0);
    hasMoreData = true;

    private refreshActivity$ = new BehaviorSubject<void>(undefined);
  
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

usersInfo$: Observable<User[]> = combineLatest([
  this.pageTrigger$,
  this.refreshActivity$
]).pipe(
  switchMap(([page]) =>
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

  constructor(
    private playService: PlayService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController)
    {
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


    async toAdminAlert(userId: bigint) {
    const alert = await this.alertController.create({
      header: 'Upgrade from User to Admin?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.makeAdmin(Number(userId));
          },
        },
      ],
    });
    await alert.present();
  }

      async toUserAlert(userId: bigint) {
    const alert = await this.alertController.create({
      header: 'Downgrade from Admin to User?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.makeUser(Number(userId));
          },
        },
      ],
    });
    await alert.present();
  }

  makeUser(userId: number) {
    console.log("Joining activity triggered.");
    this.playService.changeRoleToUser(userId).subscribe(() => {
      this.refreshActivity$.next();
    });
  }

    makeAdmin(userId: number) {
    console.log("Joining activity triggered.");
    this.playService.changeRoleToAdmin(userId).subscribe(() => {
      this.refreshActivity$.next();
    });
  }

  protected readonly isPlatform = isPlatform;

}