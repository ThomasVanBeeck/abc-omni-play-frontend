import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/people2/settings/settings.service';

@Component({
  selector: 'app-vcard',
  templateUrl: './charging-page.html',
  styleUrls: ['./charging-page.scss']
})
export class ChargingPage implements OnInit {
  url: string | undefined;

  constructor(private settingsService: SettingsService) {
  }

  ngOnInit() {
    this.settingsService.getSettings().subscribe(settings => {
      console.log("test")
      this.url = settings.bookingUrl;
    });
  }

}
