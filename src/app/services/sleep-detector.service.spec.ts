import { TestBed } from '@angular/core/testing';

import { SleepDetectorService } from './sleep-detector.service';

describe('SleepDetectorService', () => {
  let service: SleepDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SleepDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
