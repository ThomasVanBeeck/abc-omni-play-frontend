import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperadminXpPage } from './superadmin-xp.page';

describe('SuperadminXpPage', () => {
  let component: SuperadminXpPage;
  let fixture: ComponentFixture<SuperadminXpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminXpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
