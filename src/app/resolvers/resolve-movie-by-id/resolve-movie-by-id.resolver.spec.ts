import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { resolveMovieById } from './resolve-movie-by-id.resolver';
import { MovieDetails } from '../../interface/movie-details';

describe('resolveResolver', () => {
  const executeResolver: ResolveFn<MovieDetails> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      resolveMovieById(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
