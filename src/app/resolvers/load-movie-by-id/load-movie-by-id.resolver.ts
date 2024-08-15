import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { EMPTY, of } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  loadExternalIDs,
  loadMovieDetailsTeam,
  loadSelectedMovieById,
} from '../../store/actions';

export const loadMovieByIdResolver: ResolveFn<Boolean> = (route) => {
  const id = Number(route.params['id']);
  if (id) {
    inject(Store).dispatch(loadSelectedMovieById({ movieId: id }));
    inject(Store).dispatch(loadExternalIDs({ movieId: id }));
    inject(Store).dispatch(loadMovieDetailsTeam({ movieId: id }));
    return true;
  } else return EMPTY;
};
