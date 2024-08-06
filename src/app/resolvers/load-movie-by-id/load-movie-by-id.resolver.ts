import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { EMPTY, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadSelectedMovieById } from '../../store/actions';

export const loadMovieByIdResolver: ResolveFn<Boolean> = (route) => {
  const id = Number(route.params['id']);
  if (id) {
    inject(Store).dispatch(loadSelectedMovieById({ movieId: id }));
    return true;
  } else return EMPTY;
};
