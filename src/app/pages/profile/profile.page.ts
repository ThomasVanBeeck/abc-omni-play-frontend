import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../../services/people2/profile/profile.service';
import {Profile} from '../../models/profile';
import {
  faAward,
  faBook,
  faBriefcase,
  faCheckDouble,
  faGraduationCap,
  faLanguage,
  faRankingStar,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {isPlatform, RefresherCustomEvent} from '@ionic/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {EmployeeProfile} from '../../models/employee-profile';
import {OnesignalService} from "../../services/onesignal/onesignal.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  user: string | undefined;
  profile: Profile | undefined;
  profileLoading: boolean = true;
  profilePicture: string | undefined;
  profilePictureLoading: boolean = true;
  profile_tab = 'profile';
  myProfile: boolean = false;
  employee: EmployeeProfile | undefined;

  constructor(private profileService: ProfileService, private activatedRoute: ActivatedRoute, private authService: AuthService, private oneSignalService: OnesignalService) {
  }

  private async loadProfile() {
    this.activatedRoute.params.subscribe(params => {
      this.profileService.getUserProfile(params['user']).subscribe(
        {
          next: (profile) => {
            this.profile = profile;
            this.profileLoading = false;
          },
          error: (error) => {
            console.error('Error while loading profile: ', error.message);
            this.profileLoading = false;
          }
        }
      );
      this.profileService.getUserProfileDetails(params['user']).subscribe(
        {
          next: (employee) => {
            this.employee = employee;
            this.sortEmployeeItems();
          },
          error: (error) => {
            console.error('Error while loading employee details: ', error.message);
          }
        }
      );
    });
  }

  private sortEmployeeItems() {
    if (this.employee === undefined)
      return;
    if (this.employee?.experiences !== null && this.employee?.experiences.length > 0)
      this.employee.experiences.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
    if (this.employee?.educations !== null && this.employee?.educations.length > 0)
      this.employee.educations.sort((a, b) => new Date(b.endYear).getTime() - new Date(a.endYear).getTime());
    if (this.employee?.courses !== null && this.employee?.courses.length > 0)
      this.employee.courses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (this.employee?.certificates !== null && this.employee?.certificates.length > 0)
      this.employee.certificates.sort((a, b) => new Date(b.dateObtained).getTime() - new Date(a.dateObtained).getTime());
    if (this.employee?.exams !== null && this.employee?.exams.length > 0)
      this.employee.exams.sort((a, b) => new Date(b.datePassed).getTime() - new Date(a.datePassed).getTime());
  }

  private async loadProfilePicture() {
    this.activatedRoute.params.subscribe(params => {
      this.profileService.getUserProfilePicture(params['user']).subscribe(
        {
          next: (profilePicture) => {
            if (profilePicture === null) {
              this.setDefaultImage();
            } else {
              this.profilePicture = 'data:image/jpeg;base64,' + profilePicture!.base64Image;
            }
            this.profilePictureLoading = false;
          },
          error: (error) => {
            console.error('Error while loading profile picture: ', error.message);
            this.profilePictureLoading = false;
          }
        }
      );
    });
  }

  private setDefaultImage() {
    this.profilePicture = 'assets/images/user.png';
  }

  ngOnInit() {
    this.myProfile = this.authService.getLoggedInUser()?.username === this.activatedRoute.snapshot.params['user'];
    this.loadProfile().then();
    this.loadProfilePicture().then();



  }

  segmentChanged(event: any) {
    this.profile_tab = event.detail.value;
  }


  async refreshProfileData(event: RefresherCustomEvent) {
    this.profileLoading = true;
    await this.loadProfile();
    await this.loadProfilePicture();
    await event.target.complete();
    this.profileLoading = false;
  }

  protected readonly faUser = faUser;
  protected readonly faBriefcase = faBriefcase;
  protected readonly isPlatform = isPlatform;
  protected readonly faGraduationCap = faGraduationCap;
  protected readonly faRankingStar = faRankingStar;
  protected readonly faBook = faBook;
  protected readonly faLanguage = faLanguage;
  protected readonly faAward = faAward;
  protected readonly faCheckDouble = faCheckDouble;
}
