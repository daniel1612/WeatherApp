import { TestBed } from '@angular/core/testing';

import { DegreeModeService } from './degree-mode.service';

describe('DegreeModeService', () => {
  let service: DegreeModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DegreeModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
