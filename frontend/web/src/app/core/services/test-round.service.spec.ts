import { TestBed } from '@angular/core/testing';

import { TestRoundService } from './test-round.service';

describe('TestRoundService', () => {
  let service: TestRoundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestRoundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
