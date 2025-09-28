import {Component, Input, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {LoadingIndicatorComponent} from "../../../../common/loading-indicator/loading-indicator.component";
import {BirthdayProfile} from "../../../../models/birthday-profile";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TranslocoDirective} from "@jsverse/transloco";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {ProfileService} from "../../../../services/people2/profile/profile.service";
import {faCrown} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-birthday-card',
  templateUrl: './birthday-card.component.html',
  styleUrls: ['./birthday-card.component.scss'],
  imports: [
    IonicModule,
    LoadingIndicatorComponent,
    FontAwesomeModule,
    TranslocoDirective,
    NgIf
  ],
  standalone: true
})
export class BirthdayCardComponent implements OnInit {
  imageLoading: boolean = true;
  image: string | undefined;
  today: boolean = false;
  @Input() birthdayProfile!: BirthdayProfile;

  constructor(private router: Router, private profileService: ProfileService) {
  }

  ngOnInit() {
    this.loadProfilePicture();
    this.transformBirthDay();
  }

  loadProfilePicture() {
    this.profileService.getUserProfilePicture(this.birthdayProfile.email).subscribe(
      {
        next: (profilePicture) => {
          if (profilePicture === null) {
            this.setDefaultImage()
          } else {
            this.image = "data:image/jpeg;base64," + profilePicture!.base64Image;
          }
          this.imageLoading = false;
        },
        error: (_) => {
          this.setDefaultImage();
          this.imageLoading = false;
        }
      },
    )
  }

  private setDefaultImage() {
    this.image = "assets/images/user.png";
  }

  async navigateToProfile() {
    await this.router.navigate(['/profile', this.birthdayProfile.email]);
  }

  private transformBirthDay() {
    const date = new Date(this.birthdayProfile.birthDay);
    this.today = date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate();
    this.birthdayProfile.birthDay = `${date.getDate()}/${date.getMonth() + 1} - ${this.getAge(date)}`;
  }

  private getAge(date: Date) {
    const diff = Date.now() - date.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970) + (date.getMonth() > new Date().getMonth() || (date.getMonth() === new Date().getMonth() && date.getDate() >= new Date().getDate()) ? 1 : 0);
  }

  protected readonly faCrown = faCrown;
}
