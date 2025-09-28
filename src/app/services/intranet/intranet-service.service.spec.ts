import { TestBed } from '@angular/core/testing';

import { IntranetServiceService } from './intranet-service.service';

describe('IntranetServiceService', () => {
  let service: IntranetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntranetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
