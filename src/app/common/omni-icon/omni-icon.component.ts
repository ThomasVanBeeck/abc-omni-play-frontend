import {Component, Input} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-omni-icon',
  templateUrl: './omni-icon.component.html',
  styleUrls: ['./omni-icon.component.scss'],
  imports: [
    NgOptimizedImage,
    NgIf
  ],
  standalone: true
})
export class OmniIconComponent {
  @Input({required: false}) showText: boolean = true;

  constructor() {
  }
}
