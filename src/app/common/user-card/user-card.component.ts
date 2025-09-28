import {Component, Input, OnInit} from '@angular/core';
import {Profile} from "../../models/profile";
import {IonicModule} from "@ionic/angular";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ProfileService} from "../../services/people2/profile/profile.service";
import {LoadingIndicatorComponent} from "../loading-indicator/loading-indicator.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import {TranslocoDirective} from "@jsverse/transloco";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    NgIf,
    NgOptimizedImage,
    LoadingIndicatorComponent,
    FontAwesomeModule,
    TranslocoDirective
  ]
})
export class UserCardComponent implements OnInit {
  @Input() user!: Profile;
  @Input() manager: boolean = false;
  @Input() showImage: boolean = true;
  image: string | undefined;
  imageLoading: boolean = true;

  constructor(private profileService: ProfileService, private router: Router) {
  }

  ngOnInit() {
    if (this.showImage) {
      this.loadProfilePicture();
    }
  }

  loadProfilePicture() {
    this.profileService.getUserProfilePicture(this.user.userPrincipalName).subscribe(
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
    await this.router.navigate(['/profile', this.user.userPrincipalName]);
  }

  protected readonly faUpRightFromSquare = faUpRightFromSquare;
}
