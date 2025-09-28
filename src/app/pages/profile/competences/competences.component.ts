import { Component, Input } from '@angular/core';
import { AchievedCompetence } from '../../../models/competence';
import { IonicModule } from '@ionic/angular';
import { NgForOf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.scss'],
  imports: [
    IonicModule,
    NgForOf,
    FaIconComponent
  ],
  standalone: true
})
export class CompetencesComponent {
  @Input() competences: AchievedCompetence[] | undefined;

  constructor() {
  }


  protected readonly faStar = faStar;
}
