import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faComputer, faInfoCircle, faQuestionCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { isPlatform } from '@ionic/core';
import { Observable, switchMap } from 'rxjs';
import { User } from 'src/app/models/user';
import { PlayService } from 'src/app/services/play/play.service';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['../play.page.scss'],
})

export class HelpPage {

  constructor(private playService: PlayService, private route: ActivatedRoute
  ) { }
  
  faQuestionCircle = faQuestionCircle;
  faComputer = faComputer;
  faInfoCircle = faInfoCircle;
  faStar = faStar;

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

  protected readonly isPlatform = isPlatform;
}
