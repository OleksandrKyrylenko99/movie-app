import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { loadMovieDataResolver } from './load-movie-data.resolver';

describe('resolveMovieDataResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      loadMovieDataResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
