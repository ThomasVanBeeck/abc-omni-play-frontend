import {Component, Input} from '@angular/core';
import {PassedExam} from "../../../models/exam";
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
  imports: [
    IonicModule,
    NgForOf
  ],
  standalone: true
})
export class ExamsComponent {
  @Input() exams: PassedExam[] | undefined;

  constructor() {
  }
}
