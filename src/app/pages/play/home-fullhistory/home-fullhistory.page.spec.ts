import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeFullhistoryPage } from './home-fullhistory.page';

describe('HomeFullhistoryPage', () => {
  let component: HomeFullhistoryPage;
  let fixture: ComponentFixture<HomeFullhistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFullhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
