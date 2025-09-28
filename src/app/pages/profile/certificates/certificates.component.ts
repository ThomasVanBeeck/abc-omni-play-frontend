import { Component, Input } from '@angular/core';
import { ObtainedCertificate } from '../../../models/certificate';
import { IonicModule } from '@ionic/angular';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-certificates',
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
  imports: [
    IonicModule,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class CertificatesComponent {
  @Input() certificates: ObtainedCertificate[] | undefined;

  constructor() {
  }


}
