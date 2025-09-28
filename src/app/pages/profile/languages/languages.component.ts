import { Component, Input } from '@angular/core';
import { Language } from '../../../models/language';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { NgForOf } from '@angular/common';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss'],
  imports: [
    FaIconComponent,
    IonicModule,
    NgForOf,
    TranslocoDirective
  ],
  standalone: true
})
export class LanguagesComponent {
  @Input() languages: Language[] | undefined;

  constructor() {
  }

  protected readonly faStar = faStar;
}
