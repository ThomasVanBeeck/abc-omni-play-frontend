import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RankingXpPage } from './ranking-xp.page';

describe('RankingXpPage', () => {
  let component: RankingXpPage;
  let fixture: ComponentFixture<RankingXpPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingXpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
