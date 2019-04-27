import { TestBed } from '@angular/core/testing';

import { ObjectCreatorService } from './object-creator.service';

describe('ObjectCreatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObjectCreatorService = TestBed.get(ObjectCreatorService);
    expect(service).toBeTruthy();
  });
});
