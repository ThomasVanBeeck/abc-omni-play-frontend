import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoresFormPage } from './scores-form.page';

describe('ScoresFormPage', () => {
  let component: ScoresFormPage;
  let fixture: ComponentFixture<ScoresFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
