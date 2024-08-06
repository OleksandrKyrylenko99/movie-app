import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadGenres } from '../../store/actions';

export const genresResolver: ResolveFn<boolean> = (route, state) => {
  inject(Store).dispatch(loadGenres({ typeGenresList: 'movie' }));
  return true;
};
