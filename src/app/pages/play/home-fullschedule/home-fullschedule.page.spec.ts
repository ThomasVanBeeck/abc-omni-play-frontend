import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeFullschedulePage } from './home-fullschedule.page';

describe('HomeFullschedulePage', () => {
  let component: HomeFullschedulePage;
  let fixture: ComponentFixture<HomeFullschedulePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFullschedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
