import { createAction, props } from '@ngrx/store';
import { MovieInfo } from '../types/movie-info.type';
import { MovieDetails } from '../interface/movie-details';

export const loadMoviesList = createAction(
  '[MoviesList] load Movies List',
  props<{ category: string }>()
);
export const loadMoviesListSuccess = createAction(
  '[MoviesList] load Movies List Success',
  props<{ moviesList: MovieInfo[] | null }>()
);
export const loadMoviesListFailure = createAction(
  '[MoviesList] load Movies List Failure',
  props<{ error: any }>()
);

// отримання вибраного фільма за його id
export const loadSelectedMovieById = createAction(
  '[SelectedMovieById] load Selected Movie By Id',
  props<{ movieId: number }>()
);
export const loadSelectedMovieByIdSuccess = createAction(
  '[SelectedMovieById] load Selected Movie By Id Success',
  props<{ selectedMovieById: MovieDetails | null }>()
);
export const loadSelectedMovieByIdFailure = createAction(
  '[SelectedMovieById] load Selected Movie By Id Failure',
  props<{ error: any }>()
);

// отримання списку вибраних фільмів за його типом
export const loadSelectedMoviesListByType = createAction(
  '[SelectedMoviesListByType] load Selected Movies List By Type',
  props<{ typeMoviesList: string }>()
);
export const loadSelectedMoviesListByTypeSuccess = createAction(
  '[SelectedMoviesListByTypeSuccess] load Selected Movies List By Type Success',
  props<{ selectedMoviesListByType: MovieInfo[] | null }>()
);
export const loadSelectedMoviesListByTypeFailure = createAction(
  '[SelectedMoviesListByType] load Selected Movies List By Type Failure',
  props<{ error: any }>()
);

// додавання фільму до списку вибраних
export const addMovieToSelectedList = createAction(
  '[AddMovieToSelectedList] add Movie To Selected List',
  props<{ movieId: number; typeOfSelectedMovieList: string }>()
);
export const addMovieToSelectedListSuccess = createAction(
  '[AddMovieToSelectedListSuccess] add Movie To Selected List Success',
  props<{ addMovieToListOfSelectedByType: null }>()
);
export const addMovieToSelectedListFailure = createAction(
  '[AddMovieToSelectedListType] add Movie To Selected List Failure',
  props<{ error: any }>()
);

// видалення фільму до списку вибраних
export const removeMovieToSelectedList = createAction(
  '[RemoveMovieToSelectedList] remove Movie To Selected List',
  props<{ movieId: number; typeOfSelectedMovieList: string }>()
);
export const removeMovieToSelectedListSuccess = createAction(
  '[RemoveMovieToSelectedListSuccess] remove Movie To Selected List Success',
  props<{
    movieId: number;
  }>()
);
export const removeMovieToSelectedListFailure = createAction(
  '[RemoveMovieToSelectedListType] remove Movie To Selected List Failure',
  props<{ error: any }>()
);
