import { Component, OnInit} from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
import { faComputer, faInfoCircle, faQuestionCircle, faStar} from '@fortawesome/free-solid-svg-icons';
import { PlayService } from 'src/app/services/play/play.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of, switchMap, take } from 'rxjs';
import { AppRole, User } from 'src/app/models/user';
import { ActivityDetailed } from 'src/app/models/activity_detailed';
import { ActivityType } from 'src/app/models/activity_type';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.page.html',
  styleUrls: ['../play.page.scss'],
})
export class ActivityFormPage implements OnInit {

  constructor(
    private playService: PlayService,
    private route: ActivatedRoute,
    private alertController : AlertController,
    private toastController: ToastController,
    private router: Router) { }

    today!: string;

    faQuestionCircle = faQuestionCircle;
    faComputer = faComputer;
    faInfoCircle = faInfoCircle;
    faStar = faStar;

    private refreshActivity$ = new BehaviorSubject<void>(undefined);

    localActivity!: ActivityDetailed;

    userInfo$: Observable<User | null> = this.playService.getGlobalUser();

    typesInfo$: Observable<ActivityType[] | null> = this.playService.getActivityTypes();

    isNew : boolean = false;

    ngOnInit(): void {
        this.activityInfo$.pipe(take(1)).subscribe(activity => {
          if(activity)
            this.localActivity = { ...activity};
        })
        const now = new Date();
        this.today = now.toISOString().split('T')[0];
    }

    activityInfo$: Observable<ActivityDetailed | null> = combineLatest([
      this.route.paramMap,
      this.refreshActivity$
    ]).pipe(
      switchMap(([params]) => {
        const id = params.get('id');
        if(id) {
          return this.playService.getDetailedActivityById(Number(id));
        } else {
          const newActivity: ActivityDetailed = {
            id: BigInt(0),
            ownerDTO: {
              id: BigInt(0),
              firstName: '',
              lastName: '',
              appRole: AppRole.USER,
              experiencePoints: BigInt(0)
            },
            activityTypeDTO: {
              id: BigInt(0),
              name: '',
              minParticipants: 1,
              maxParticipants: 2,
              duration: 60,
              teamsPerActivity: 2,
              hasRanking: false,
              isDeleted: false
            },       
            competitionId: undefined,
            name: '',
            category: '',
            description: '',
            activityDate: new Date().toISOString().substring(0, 10),
            deadlineDate: new Date().toISOString().substring(0, 10),
            startTime: '14:00',
            endTime: '15:00',
            activityStatus: 'OPEN', 
            participantDTOs: []
          };
          this.isNew = true;
          this.localActivity = newActivity;
          return of(newActivity);
        }
      })
    );

    async saveAlert() {
      const alert = await this.alertController.create({
        header: 'Are you sure?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              this.saveActivity();
            },
          },
        ],
      });
    
      await alert.present();
    }

    async cancelAlert() {
      const alert = await this.alertController.create({
        header: 'Are you sure?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              this.cancelActivity();
            },
          },
        ],
      });
    
      await alert.present();
    }

    compareWith = (o1: any, o2: any) => {
      return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };

    async presentSuccessToast() {
      const toast = await this.toastController.create({
        message: 'Successfully saved!',
        duration: 1200,
        position: 'bottom',
        color: 'success'
      });
      toast.present();
    }

    async presentErrorToast() {
      const toast = await this.toastController.create({
        message: 'Information is missing.',
        duration: 1200,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
    }

    saveActivity() {
      if (this.localActivity) {
        const body = {
          name: this.localActivity.name,
          ownerId: Number(this.localActivity.ownerDTO.id),
          category: this.localActivity.category,
          description: this.localActivity.description,
          activityTypeId: Number(this.localActivity.activityTypeDTO.id),
          activityDate: this.localActivity.activityDate,
          startTime: this.localActivity.startTime,
          endTime: this.localActivity.endTime,
          deadlineDate: this.localActivity.deadlineDate
        };
    
        const onSuccess = () => {
            this.router.navigate(['/play/activities']).then(() => {
              this.presentSuccessToast();
            });
        };
        
    
        const onError = (error: any) => {
          console.error('Error occurred:', error);
          this.presentErrorToast();
        };
    
        if (this.isNew) {
          this.playService.newActivity(body).subscribe({
            next: onSuccess,
            error: onError
          });
        } else {
          this.playService.editActivity(Number(this.localActivity.id), body).subscribe({
            next: onSuccess,
            error: onError
          });
        }
      }
    }

  cancelActivity() {
    this.playService.cancelActivity(Number(this.localActivity.id)).subscribe(()=> {
      this.router.navigate(['/play/activities']);
    });
  }
}