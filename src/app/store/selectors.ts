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
export const selectSeriesDetails = createSelector(
  selectState,
  (state) => state.selectedSeriesById
);
export const selectMoviesListByType = createSelector(
  selectState,
  (state) => state.selectedMoviesListByType
);

export const selectMovieOrSerieDetailsTeam = createSelector(
  selectState,
  (state) => state.getDetailsMovieOrSerieTeam
);

export const selectExternalIDs = createSelector(
  selectState,
  (state) => state.getExternalIDs
);

export const selectGenres = createSelector(
  selectState,
  (state) => state.genresList
);

export const selectMediaMovies = createSelector(
  selectState,
  (state) => state.selectMediaMovies
);
export const selectMediaSeries = createSelector(
  selectState,
  (state) => state.selectMediaSeries
);
