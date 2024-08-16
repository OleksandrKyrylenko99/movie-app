import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { loadMovieOrSerieByIdResolver } from './load-movie-or-series-by-id.resolver';

describe('resolveResolver', () => {
  const executeResolver: ResolveFn<Boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      loadMovieOrSerieByIdResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
