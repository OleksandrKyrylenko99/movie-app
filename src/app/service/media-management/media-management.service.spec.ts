import { TestBed } from '@angular/core/testing';

import { MediaManagementService } from './media-management.service';

describe('MediaManagementService', () => {
  let service: MediaManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
