import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

type NotificationType = 'info' | 'warning' | 'error' | 'success';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() faIcon: IconDefinition | undefined;
  @Output() onClicked = new EventEmitter();
  @Input() typeNotification: NotificationType | undefined;

  background = signal<string | undefined>(undefined);

  constructor() {}

  ngOnInit() {
    switch (this.typeNotification) {
      case 'info':
        this.background.set('bg-blue-900');
        break;
      case 'warning':
        this.background.set('bg-yellow-900');
        break;
      case 'error':
        this.background.set('bg-red-900');
        break;
      case 'success':
        this.background.set('bg-green-900');
        break;
    }
  }

  handleClick() {
    this.onClicked.emit();
  }
}
