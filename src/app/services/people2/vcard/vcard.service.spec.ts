import { TestBed } from '@angular/core/testing';

import { VCardService } from './v-card.service';

describe('VcardService', () => {
  let service: VCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
