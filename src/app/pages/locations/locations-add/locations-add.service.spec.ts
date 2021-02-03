import { TestBed } from '@angular/core/testing';

import { LocationsAddService } from './locations-add.service';

describe('LocationsAddService', () => {
  let service: LocationsAddService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationsAddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
