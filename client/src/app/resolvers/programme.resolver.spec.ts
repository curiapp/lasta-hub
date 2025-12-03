import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { programmeResolver } from './programme.resolver';

describe('programmeResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => programmeResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
