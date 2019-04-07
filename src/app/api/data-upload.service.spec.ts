import { TestBed } from '@angular/core/testing';

import { DataUploadService } from './data-upload.service';

describe('DataUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataUploadService = TestBed.get(DataUploadService);
    expect(service).toBeTruthy();
  });
});
