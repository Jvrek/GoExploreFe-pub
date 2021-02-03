import { TestBed } from '@angular/core/testing';

import { LocationPopularityDetailsService } from './location-popularity-details.service';

describe('LocationPopularityDetailsService', () => {
  let service: LocationPopularityDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationPopularityDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
