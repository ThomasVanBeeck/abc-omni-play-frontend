import { Component, Input } from '@angular/core';
import { Education } from '../../../models/education';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-educations',
  templateUrl: './educations.component.html',
  styleUrls: ['./educations.component.scss'],
  imports: [
    FaIconComponent,
    IonicModule,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class EducationsComponent {
  @Input() educations: Education[] | undefined = [];

  constructor() {
  }

  protected readonly faCircleInfo = faCircleInfo;
}
