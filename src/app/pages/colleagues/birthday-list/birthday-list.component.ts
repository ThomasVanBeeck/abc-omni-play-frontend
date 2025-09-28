import {Component, CUSTOM_ELEMENTS_SCHEMA, OnInit} from '@angular/core';
import {ColleaguesService} from "../../../services/people2/colleagues/colleagues.service";
import {BirthdayProfile} from "../../../models/birthday-profile";
import {IonicModule} from "@ionic/angular";
import {NgForOf, NgIf} from "@angular/common";
import {UserCardComponent} from "../../../common/user-card/user-card.component";
import {BirthdayCardComponent} from "./birthday-card/birthday-card.component";
import {TranslocoDirective} from "@jsverse/transloco";

@Component({
  selector: 'app-birthday-list',
  templateUrl: 'birthday-list.component.html',
  styleUrls: ['./birthday-list.component.scss'],
  standalone: true,
  imports: [IonicModule, NgForOf, UserCardComponent, BirthdayCardComponent, TranslocoDirective, NgIf,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class BirthdayListComponent implements OnInit {
  birthdays: BirthdayProfile[] = []
  birthdaysLoading: boolean = true;

  constructor(private colleaguesService: ColleaguesService) {
  }

  ngOnInit() {
    this.getBirthdays();
  }

  getBirthdays() {
    this.colleaguesService.getBirthdayList().subscribe({
      next: (birthdays: BirthdayProfile[]) => {
        this.birthdays = birthdays;
        this.birthdaysLoading = false;
      },
      error: (error) => {
        console.error('Error fetching birthday list', error);
        this.birthdaysLoading = false;
      }
    });
  }
}
