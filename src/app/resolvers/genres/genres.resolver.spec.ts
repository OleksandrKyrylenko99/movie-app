import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { genresResolver } from './genres.resolver';

describe('genresResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => genresResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
