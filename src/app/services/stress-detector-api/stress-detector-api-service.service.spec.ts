import { TestBed } from '@angular/core/testing';

import { StressDetectorApiService } from './stress-detector-api-service.service';

describe('StressDetectorApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StressDetectorApiService = TestBed.get(StressDetectorApiService);
    expect(service).toBeTruthy();
  });
});
