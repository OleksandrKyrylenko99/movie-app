import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { EMPTY } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  loadExternalIDs,
  loadMovieOrSerieDetailsTeam,
  loadSelectedMovieById,
  loadSelectedSeriesById,
} from '../../store/actions';

export const loadMovieOrSerieByIdResolver: ResolveFn<Boolean> = (route) => {
  const id = Number(route.params['id']);
  const mediaType = route.data['mediaType'];
  if (mediaType === 'movie') {
    inject(Store).dispatch(
      loadSelectedMovieById({ id: id, mediaType: mediaType })
    );
    inject(Store).dispatch(
      loadExternalIDs({ movieId: id, mediaType: mediaType })
    );
    inject(Store).dispatch(
      loadMovieOrSerieDetailsTeam({ movieId: id, mediaType: mediaType })
    );
    return true;
  } else if (mediaType === 'tv') {
    inject(Store).dispatch(
      loadSelectedSeriesById({ id: id, mediaType: mediaType })
    );
    inject(Store).dispatch(
      loadExternalIDs({ movieId: id, mediaType: mediaType })
    );
    inject(Store).dispatch(
      loadMovieOrSerieDetailsTeam({ movieId: id, mediaType: mediaType })
    );
    return true;
  } else return EMPTY;
};
