import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuperadminAdminsPage } from './superadmin-admins.page';

describe('SuperadminAdminsPage', () => {
  let component: SuperadminAdminsPage;
  let fixture: ComponentFixture<SuperadminAdminsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminAdminsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
