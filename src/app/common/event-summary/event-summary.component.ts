import { Component, OnInit } from '@angular/core';
import { IntranetServiceService } from '../../services/intranet/intranet-service.service';
import { Event } from '../../models/event';
import { NgForOf, NgIf } from '@angular/common';
import { IonicModule, Platform } from '@ionic/angular';
import { TranslocoDirective } from '@jsverse/transloco';
import { EventCardComponent } from './event-card/event-card.component';

@Component({
  selector: 'app-event-summary',
  templateUrl: './event-summary.component.html',
  standalone: true,
  imports: [
    NgForOf,
    IonicModule,
    TranslocoDirective,
    EventCardComponent,
    NgIf
  ],
  styleUrls: ['./event-summary.component.scss']
})
export class EventSummaryComponent implements OnInit {
  events: Event[] = [];
  eventsToday: Event[] = [];
  today: string;
  todayDate: Date;
  eventsTomorrow: Event[] = [];
  tomorrow: string;
  nextEvents: Event[] = [];
  nextEventDay: string | undefined;
  nextEventDate: number | undefined;
  nextEventMonth: string | undefined;

  private months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  private weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  date = new Date();


  constructor(private intranetService: IntranetServiceService, private translation: TranslocoDirective, private platform: Platform) {
    const index = this.date.getDay();
    this.todayDate = new Date();
    this.today = `days.${this.weekday[index]}`;
    this.tomorrow = `days.${this.weekday[(index + 1) % 7]}`;
  }

  ngOnInit() {
    this.fetchAndSetEvents();
    this.platform.resume.subscribe(() => {
      this.fetchAndSetEvents();
    });
  }

  private fetchAndSetEvents() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.intranetService.fetchFutureEvents().subscribe(value => {
      this.events = value;
      this.eventsToday = this.events.filter(event => {
        return new Date(event.startDate).toDateString() === this.date.toDateString();
      });
      this.eventsTomorrow = this.events.filter(event => {
        return new Date(event.startDate).toDateString() === tomorrow.toDateString();
      });
      // first day with events after tomorrow
      this.nextEvents = this.events.filter(event => {
        return new Date(event.startDate) > new Date(tomorrow);
      }).slice(0, 3);
      if (this.nextEvents.length > 0) {
        const start = new Date(this.nextEvents[0].startDate);
        this.nextEvents = this.nextEvents.filter(event => {
          return new Date(event.startDate).toDateString() === start.toDateString();
        });
        this.nextEventMonth = `months.short.${this.months[new Date(this.nextEvents[0].startDate).getMonth()]}`;
        this.nextEventDate = new Date(this.nextEvents[0].startDate).getDate();
        this.nextEventDay = `days.short.${this.weekday[new Date(this.nextEvents[0].startDate).getDay()]}`;
      }

    });
  }

}
