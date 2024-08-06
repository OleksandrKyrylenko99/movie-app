import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MovieState } from './state';

export const selectState = createFeatureSelector<MovieState>('MovieState');
export const selectMovieByCategory = createSelector(
  selectState,
  (state) => state.moviesList
);
export const selectMovieDetails = createSelector(
  selectState,
  (state) => state.selectedMovieById
);
export const selectMoviesListByType = createSelector(
  selectState,
  (state) => state.selectedMoviesListByType
);

export const selectMovieDetailsTeam = createSelector(
  selectState,
  (state) => state.getDetailsMovieTeam
);

export const selectExternalIDs = createSelector(
  selectState,
  (state) => state.getExternalIDs
);

export const selectGenres = createSelector(
  selectState,
  (state) => state.genresList
);
