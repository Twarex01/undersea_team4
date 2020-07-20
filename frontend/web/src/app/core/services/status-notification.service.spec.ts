import { TestBed } from '@angular/core/testing';

import { StatusNotificationService } from './status-notification.service';

describe('StatusNotificationService', () => {
  let service: StatusNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
