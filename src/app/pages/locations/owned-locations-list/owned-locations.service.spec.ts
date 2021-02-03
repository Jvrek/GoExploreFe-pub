import { TestBed } from '@angular/core/testing';

import { OwnedLocationsService } from './owned-locations.service';

describe('LocationsService', () => {
  let service: OwnedLocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnedLocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
