import { TestBed } from '@angular/core/testing';

import { StressDetectorApiServiceService } from './stress-detector-api-service.service';

describe('StressDetectorApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StressDetectorApiServiceService = TestBed.get(StressDetectorApiServiceService);
    expect(service).toBeTruthy();
  });
});
