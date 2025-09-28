import { Component, Input } from '@angular/core';
import { Experience } from '../../../models/experience';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-expierences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.scss'],
  imports: [
    FaIconComponent,
    IonicModule,
    NgForOf,
    NgIf
  ],
  standalone: true
})
export class ExperiencesComponent {
  @Input() experiences: Experience[] | undefined = [];

  constructor() {
  }

  protected readonly faCircleInfo = faCircleInfo;
}
