import { TestBed } from '@angular/core/testing';

import { UsersUnactiveListService } from './unactive-users-list.service';

describe('UsersService', () => {
  let service: UsersUnactiveListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersUnactiveListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
