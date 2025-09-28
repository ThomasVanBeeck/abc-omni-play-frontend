import { Component } from '@angular/core';
import { isPlatform } from '@ionic/core';
import { faQuestionCircle, faComputer, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { PlayService } from 'src/app/services/play/play.service';
import { User } from 'src/app/models/user';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage {
  constructor(private playService: PlayService) {}

  activitiesPerPage: number = 5;

  userInfo$: Observable<User | null> = this.playService.getGlobalUser();

  faQuestionCircle = faQuestionCircle;
  faComputer = faComputer;
  faInfoCircle = faInfoCircle;

  protected readonly isPlatform = isPlatform;

}