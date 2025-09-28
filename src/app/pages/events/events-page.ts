import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../models/event';
import { IntranetServiceService } from '../../services/intranet/intranet-service.service';
import { faCalendarAlt, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { comment } from 'postcss';

@Component({
  selector: 'app-events',
  templateUrl: './events-page.html',
  styleUrls: ['./events-page.scss']
})
export class EventsPage implements OnInit {
  event: Event | undefined;
  eventTimes: string[] = [];

  eventDay: string | undefined;
  eventDate: number | undefined;
  eventMonth: string | undefined;
  eventYear: number | undefined;
  message: string = '';
  isToastOpen: boolean = false;

  private months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  private weekday = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  constructor(private route: ActivatedRoute, private eventService: IntranetServiceService) {

  }

  ngOnInit() {
    this.eventService.fetchEventById(this.route.snapshot.paramMap.get('id')).subscribe(
      event => {
        this.event = event;
        this.eventTimes = this.getEventTimes();
        this.setEventDate();
      }
    );
  }

  private setEventDate() {
    this.eventMonth = `months.${this.months[new Date(this.event!.startDate).getMonth()]}`;
    this.eventDate = new Date(this.event!.startDate).getDate();
    this.eventDay = `days.${this.weekday[new Date(this.event!.startDate).getDay()]}`;
    this.eventYear = new Date(this.event!.startDate).getFullYear();
  }


  private getEventTimes() {
    const start = new Date(this.event!.startDate);
    const end = new Date(this.event!.endDate);
    return [start.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    }), end.toLocaleTimeString('en-US', {
      hour12: false, hour: '2-digit',
      minute: '2-digit'
    })];
  }

  async respondGoing() {
    this.eventService.respondNotGoing(this.event!.id.toString()).subscribe(
      value => {
        this.message = 'going_response';
        this.setOpen(true);
      }
    );
  }

  async respondNotGoing() {
    this.eventService.respondGoing(this.event!.id.toString()).subscribe(
      value => {
        this.message = 'not_going_response';
        this.setOpen(true);
      }
    );
  }

  protected readonly faLocationDot = faLocationDot;
  protected readonly faCalendarAlt = faCalendarAlt;

  setOpen(b: boolean) {
    this.isToastOpen = b;
  }

  protected readonly comment = comment;
}
