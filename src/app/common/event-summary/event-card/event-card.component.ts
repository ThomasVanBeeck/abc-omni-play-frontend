import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../../models/event';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class EventCardComponent implements OnInit {
  @Input() event!: Event;
  eventTimes: string[] = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.eventTimes = this.getEventTimes();
  }

  private getEventTimes() {
    const start = new Date(this.event.startDate);
    const end = new Date(this.event.endDate);
    return [start.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    }), end.toLocaleTimeString('en-US', {
      hour12: false, hour: '2-digit',
      minute: '2-digit'
    })];
  }

  protected async navigateToDetails() {
    await this.router.navigate(['/events', this.event.id]);
  }
}
