import {Component} from '@angular/core';
import {NgIf} from "@angular/common";
import {TranslocoDirective} from "@jsverse/transloco";
import {Network} from "@capacitor/network";

@Component({
  selector: 'app-connectivity-error',
  templateUrl: './connectivity-error.component.html',
  styleUrls: ['./connectivity-error.component.scss'],
  imports: [
    NgIf,
    TranslocoDirective
  ],
  standalone: true
})
export class ConnectivityErrorComponent {
  isOnline: boolean = true;
  type: string = 'error';

  constructor() {
    Network.getStatus().then(status => {
      this.setOnline(status.connected);
    });
    Network.addListener('networkStatusChange', status => {
      this.setOnline(status.connected)
    });
  }

  setOnline(status: boolean) {
    this.isOnline = status;
  }
}
