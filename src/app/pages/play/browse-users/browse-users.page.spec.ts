import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowseUsersPage } from './browse-users.page';

describe('BrowseUsersPage', () => {
  let component: BrowseUsersPage;
  let fixture: ComponentFixture<BrowseUsersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
