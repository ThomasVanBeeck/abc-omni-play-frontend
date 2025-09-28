import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ToastController} from '@ionic/angular';
import { isPlatform } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PlayService } from 'src/app/services/play/play.service';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { faComputer, faInfoCircle, faQuestionCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, switchMap, tap, scan } from 'rxjs';
import { User } from 'src/app/models/user';
import { filter, take } from 'rxjs/operators';
import { XpMapping } from 'src/app/models/xp_mapping';

@Component({
  selector: 'app-superadmin-xp',
  templateUrl: './superadmin-xp.page.html',
  styleUrls: ['../play.page.scss'],
})
export class SuperadminXpPage implements OnInit {

  constructor(
    private playService: PlayService,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private alertController : AlertController,
    private router: Router) { }

    faQuestionCircle = faQuestionCircle;
    faComputer = faComputer;

    private refreshXpMappings$ = new BehaviorSubject<void>(undefined);

    xpMappingsInfo$: Observable<XpMapping[]> = this.playService.getXpMappings();
  
    localXpMappings!: XpMapping[];

    userInfo$: Observable<User | null> = this.playService.getGlobalUser();


    ngOnInit(): void {
        this.xpMappingsInfo$.pipe(take(1)).subscribe(xpMappings => {
          if(xpMappings)
            this.localXpMappings = xpMappings.map(mapping => ({ ...mapping}));
        })
    }


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
              this.saveXpMappings();
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
              this.resetXpMappings();
            },
          },
        ],
      });
    
      await alert.present();
    }

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
        message: 'Something went wrong.',
        duration: 1200,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
    }

 saveXpMappings() {
  if (this.localXpMappings) {
    const body = this.localXpMappings.map(xpMapping => ({
      id: xpMapping.id,
      xpToEarn: xpMapping.xpToEarn
    }));

    const onSuccess = () => {
      this.router.navigate(['/play/superadmin-xp']).then(() => {
        this.presentSuccessToast();
      });
    };

    const onError = (error: any) => {
      console.error('Error occurred:', error);
      this.presentErrorToast();
    };

    this.playService.editXpMappings(body).subscribe({
      next: onSuccess,
      error: onError
    });
  }
}

resetXpMappings() {
  console.log("reset xp triggered")

  this.playService.getXpMappings().pipe(take(1)).subscribe(xpMappings => {
    this.localXpMappings = xpMappings.map(mapping => ({ ...mapping }));
  });
}


  protected readonly isPlatform = isPlatform;
}