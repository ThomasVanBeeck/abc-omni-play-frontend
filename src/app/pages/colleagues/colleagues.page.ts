import { Component, OnInit, ViewChild } from '@angular/core';
import { Profile } from 'src/app/models/profile';
import { ColleaguesService } from '../../services/people2/colleagues/colleagues.service';
import { Components, isPlatform, RefresherCustomEvent } from '@ionic/core';
import { faArrowDownAZ, faArrowUpAZ } from '@fortawesome/free-solid-svg-icons';
import IonInput = Components.IonInput;

@Component({
  selector: 'app-colleagues',
  templateUrl: './colleagues.page.html',
  styleUrls: ['./colleagues.page.scss']
})
export class ColleaguesPage implements OnInit {
  colleagues: Profile[] = [];
  colleaguesLoading: boolean = true;
  searchFilter: string = '';
  sortAlphabetically: boolean = true;

  constructor(private colleaguesService: ColleaguesService) {
  }

  ngOnInit() {
    this.loadColleagues();
  }

  updateSortAlphabetically() {
    this.sortAlphabetically = !this.sortAlphabetically;
    this.sortColleaguesAlphabetically();
    if (!this.sortAlphabetically) {
      this.colleagues.reverse();
    }
  }

  private sortColleaguesAlphabetically() {
    this.colleagues.sort((a, b) => {
      return a.displayName.localeCompare(b.displayName);
    });
  }


  private loadColleagues() {
    this.colleaguesService.getColleagues('1').subscribe({
      next: (colleagues) => {
        this.colleagues = colleagues;
        this.colleaguesLoading = false;
      },
      error: (error) => {
        console.error('Error while loading colleagues: ', error.message);
        this.colleaguesLoading = false;
      }
    });
  }

  async refreshColleagues(event: RefresherCustomEvent) {
    this.colleaguesLoading = true;
    this.loadColleagues();
    await event.target.complete();
    this.colleaguesLoading = false;
  }

  @ViewChild('ionInputEl', { static: true }) ionInputEl!: IonInput;

  onInput(event: any) {
    this.searchFilter = event.target.value;
  }

  protected readonly isPlatform = isPlatform;
  protected readonly faArrowDownAZ = faArrowDownAZ;
  protected readonly faArrowUpAZ = faArrowUpAZ;
}
