import { TestBed } from '@angular/core/testing';

import { SpyiinfoService } from './spyiinfo.service';

describe('SpyiinfoService', () => {
  let service: SpyiinfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpyiinfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
