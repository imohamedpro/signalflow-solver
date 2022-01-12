import { TestBed } from '@angular/core/testing';

import { AccessHomeGuard } from './access-home.guard';

describe('AccessHomeGuard', () => {
  let guard: AccessHomeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccessHomeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
