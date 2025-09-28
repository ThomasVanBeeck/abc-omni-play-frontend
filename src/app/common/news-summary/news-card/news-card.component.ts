import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../../models/event';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class NewsCardComponent implements OnInit {
  @Input() event!: Event;
  eventTimes: string[] = [];

  constructor() {
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
}
