import { Component, Input } from '@angular/core';
import { Profile } from '../../../models/profile';
import { faEnvelope, faMobile, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
  imports: [
    FaIconComponent,
    IonicModule,
    NgIf
  ],
  standalone: true
})
export class BasicInfoComponent {

  @Input() profile: Profile | undefined;

  constructor() {
  }


  protected readonly faEnvelope = faEnvelope;
  protected readonly faMobile = faMobile;
  protected readonly faPhone = faPhone;
}
