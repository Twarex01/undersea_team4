import { TestBed } from '@angular/core/testing';

import { SpyingService } from './spying.service';

describe('SpyingService', () => {
  let service: SpyingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpyingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
