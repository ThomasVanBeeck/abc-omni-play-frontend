import { Component, Input } from '@angular/core';
import { FollowedCourse } from '../../../models/courses';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  imports: [
    FaIconComponent,
    IonicModule,
    NgForOf
  ],
  standalone: true
})
export class CoursesComponent {

  @Input() courses: FollowedCourse[] | undefined;

  constructor() {
  }

}
