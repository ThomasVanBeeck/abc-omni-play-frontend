import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController} from '@ionic/angular';
import { faComputer, faInfoCircle, faQuestionCircle, faStar} from '@fortawesome/free-solid-svg-icons';
import { PlayService } from 'src/app/services/play/play.service';
import { Observable, of, switchMap, take } from 'rxjs';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityScoreForm } from 'src/app/models/activity_scoreform';
import { TeamResult } from 'src/app/models/teamresult';
import { SubmitScore } from 'src/app/models/submit_score';
import { XpMapping } from 'src/app/models/xp_mapping';

@Component({
  selector: 'app-scores-form',
  templateUrl: './scores-form.page.html',
  styleUrls: ['../play.page.scss'],
})
export class ScoresFormPage implements OnInit {

  constructor(
    private playService: PlayService,
        private route: ActivatedRoute,
        private toastController: ToastController,
        private alertController : AlertController,
        private router: Router) { }

  ngOnInit(): void {
    this.activityInfo$.pipe(take(1)).subscribe(activity => {
      if (activity) {
        for (let i = 1; i <= activity.teamsPerActivity; i++) {
          this.localTeams.push({
            teamnr: i,
            result: ''
          });
        }
        for (let participant of activity.participantDTOs) {
          this.localSubmitScores.push({
            user: participant,
            content: ''
          });
        }
        if (activity.hasRanking)
          this.hasRanking = true;
      }
    });
    
    this.xpMappingsInfo$?.pipe(take(1)).subscribe(mappings => {
      if (mappings) {
        this.localXpMappings = mappings;
        
        for (const mapping of mappings) {
          if (mapping.rankingItem) {
            this.localRankingResults.push(mapping.resultName);
          } else {
            this.localTeamResults.push(mapping.resultName);
          }
        }
      }
    });
  }

      faQuestionCircle = faQuestionCircle;
      faComputer = faComputer;
      faInfoCircle = faInfoCircle;
      faStar = faStar;

      userInfo$: Observable<User | null> = this.playService.getGlobalUser();

      activityInfo$: Observable<ActivityScoreForm | null> = this.route.paramMap.pipe(
        switchMap(params => {
          const id = params.get('id');
          return id ? this.playService.getScoreFormById(Number(id)) : of(null);
        })
      );

      xpMappingsInfo$: Observable<XpMapping[]> | null = this.playService.getXpMappings();

      hasRanking: boolean = false;
      localTeams: TeamResult[] = []; // opslaan van teamnaam en teamresultaat
      localSubmitScores: SubmitScore[] = []; // per participant  
      localXpMappings: XpMapping[] = []; // resultName, xpToEarn, hasRanking
      localRankingResults: string[] = []; // 1st, 2nd, 3...
      localTeamResults: string[] = []; // win, draw, loss


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
                this.saveScores();
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
          message: 'Information is missing.',
          duration: 1200,
          position: 'bottom',
          color: 'danger'
        });
        toast.present();
      }

      saveScores() {
        const isEmptyScore = this.localSubmitScores.some(score => String(score.content).trim() === '');

      
        if (isEmptyScore) {
          this.presentErrorToast();
          return;
        }
        const onSuccess = () => {
          this.router.navigate(['/play/activities']).then(() => {
            this.presentSuccessToast();
          });
        };
        
        
        const onError = (error: any) => {
          console.error('Error occurred:', error);
          this.presentErrorToast();
        };
        const body: { userId: number, result: string }[] = [];

        if(this.hasRanking)
        {
          for (const score of this.localSubmitScores)
            body.push({userId: Number(score.user.id), result: score.content});
          }
          else {
            for (const score of this.localSubmitScores) {
              const teamnr = Number(score.content);
              const teamResult = this.getTeamResult(teamnr);
              body.push({ userId: Number(score.user.id), result: teamResult });
            }
          }


        this.presentSuccessToast();
        console.log('saveScores:', body);

        this.route.paramMap.pipe(take(1)).subscribe(params => {
          const activityId = params.get('id');
          if (activityId) {
            this.playService.postScores(Number(activityId), body).subscribe({
              next: onSuccess,
              error: onError
            });
          } else {
            console.error('Geen activiteit-ID gevonden in de route.');
            this.presentErrorToast();
          }
        });
      }

      getTeamResult(teamnr: number): string {
        const team = this.localTeams.find(t => t.teamnr === teamnr);
        return team ? team.result : '';
      }
    }