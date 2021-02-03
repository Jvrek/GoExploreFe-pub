import { TestBed } from '@angular/core/testing';

import { SelectedLocationService } from './selected-location.service';

describe('SelectedLocationService', () => {
  let service: SelectedLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
