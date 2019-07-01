import { TestBed } from '@angular/core/testing';

import { GlobalRuntimeService } from './global-runtime.service';

describe('GlobalRuntimeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalRuntimeService = TestBed.get(GlobalRuntimeService);
    expect(service).toBeTruthy();
  });
});
