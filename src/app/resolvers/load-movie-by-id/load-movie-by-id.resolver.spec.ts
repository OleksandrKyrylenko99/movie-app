import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { loadMovieByIdResolver } from './load-movie-by-id.resolver';
import { MovieDetails } from '../../interface/movie-details';

describe('resolveResolver', () => {
  const executeResolver: ResolveFn<Boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      loadMovieByIdResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
