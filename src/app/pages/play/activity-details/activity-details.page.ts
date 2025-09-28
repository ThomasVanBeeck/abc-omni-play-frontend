import { Component } from '@angular/core';
import {isPlatform , AlertController} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PlayService } from 'src/app/services/play/play.service';
import { faComputer, faInfoCircle, faQuestionCircle, faStar, faCancel} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, switchMap, combineLatest } from 'rxjs';
import { User } from 'src/app/models/user';
import { ActivityDetailed } from 'src/app/models/activity_detailed';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.page.html',
  styleUrls: ['../play.page.scss'],
})
export class ActivityDetailsPage {


onCancelUser(userId: bigint) {
  console.log(`onCancelUser triggered with user ID: ${userId}`);
}

  constructor(
    private playService: PlayService,
    private route: ActivatedRoute,
    private alertController : AlertController) { }

  faQuestionCircle = faQuestionCircle;
  faComputer = faComputer;
  faInfoCircle = faInfoCircle;
  faStar = faStar;
  faCancel = faCancel;

  private refreshActivity$ = new BehaviorSubject<void>(undefined);

  userInfo$: Observable<User | null> = this.playService.getGlobalUser();

  activityInfo$: Observable<ActivityDetailed | null> = combineLatest([
    this.route.paramMap,
    this.refreshActivity$
  ]).pipe(
    switchMap(([params]) => {
      const id = params.get('id');
      return this.playService.getDetailedActivityById(Number(id));
    })
  );

  isParticipant(userId: bigint, participants: User[]): boolean {
    return participants.some(p => p.id === userId);
  }

  async joinAlert(userId: bigint, activityId: bigint) {
    const alert = await this.alertController.create({
      header: 'Join this activity?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.joinActivity(Number(userId), Number(activityId));
          },
        },
      ],
    });
  
    await alert.present();
  }

  async leaveAlert(userId: bigint, activityId: bigint) {
    const alert = await this.alertController.create({
      header: 'Leave this activity?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: "OK",
          role: "confirm",
          handler: () => {
            this.leaveActivity(Number(userId), Number(activityId));
          },
        },
      ]
    });

    await alert.present();
  }

  async kickAlert(userId: bigint, activityId: bigint) {
    const alert = await this.alertController.create({
      header: 'Kick this user from activity?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: "OK",
          role: "confirm",
          handler: () => {
            this.kickUserFromActivity(Number(userId), Number(activityId));
          },
        },
      ]
    });

    await alert.present();
  }

  joinActivity(userId: number, activityId: number) {
    console.log("Joining activity triggered.");
    this.playService.joinActivity(userId, activityId).subscribe(() => {
      this.refreshActivity$.next();
    });
  }

  kickUserFromActivity(userId: number, activityId: number) {
    console.log("kicking from activity triggered.");
    this.playService.kickUserFromActivity(userId, activityId).subscribe(() => {
      this.refreshActivity$.next();
    });
  }
  
  leaveActivity(userId: number, activityId: number) {
    console.log("Leaving activity triggered.");
    this.playService.leaveActivity(userId, activityId).subscribe(() => {
      this.refreshActivity$.next();
    });
  }
  
  editActivity() {
    console.log("Edit activity triggered.");
  }
  
  protected readonly isPlatform = isPlatform;
}