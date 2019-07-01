import { TestBed, async, inject } from '@angular/core/testing';

import { LoadingScreenGuardGuard } from './loading-screen-guard.guard';

describe('LoadingScreenGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingScreenGuardGuard]
    });
  });

  it('should ...', inject([LoadingScreenGuardGuard], (guard: LoadingScreenGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
