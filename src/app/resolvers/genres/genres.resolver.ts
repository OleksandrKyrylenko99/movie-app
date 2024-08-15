import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadGenres } from '../../store/actions';

export const genresResolver: ResolveFn<boolean> = (route, state) => {
  const typePage = route.data['typePage'];
  inject(Store).dispatch(loadGenres({ typeGenresList: typePage }));
  return true;
};
