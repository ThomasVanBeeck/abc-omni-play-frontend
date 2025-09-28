import { TestBed } from '@angular/core/testing';

import { ColleaguesService } from './colleagues.service';

describe('ColleaguesService', () => {
  let service: ColleaguesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColleaguesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
