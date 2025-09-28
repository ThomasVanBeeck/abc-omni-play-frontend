import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeSummaryPage } from './home-summary.page';

describe('HomeSummaryPage', () => {
  let component: HomeSummaryPage;
  let fixture: ComponentFixture<HomeSummaryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
