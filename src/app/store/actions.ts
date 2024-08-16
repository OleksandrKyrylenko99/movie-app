import { createAction, props } from '@ngrx/store';
import { MovieInfo } from '../types/movie-info.type';
import { MovieDetails } from '../interface/movie-details';
import { MovieDetailsTeam } from '../interface/movie-details-team';
import { ExternalIds } from '../types/externalIds';
import { GenresList } from '../types/genres';
import { SeriesInfo } from '../types/series-info';
import { GetParams } from '../types/get-params-media';
import { SeriesDetails } from '../interface/series-details';

export const loadMoviesList = createAction(
  '[MoviesList] load Movies List',
  props<{ mediaType: string; category: string }>()
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
  props<{ id: number; mediaType: string }>()
);
export const loadSelectedMovieByIdSuccess = createAction(
  '[SelectedMovieById] load Selected Movie By Id Success',
  props<{ selectedMovieById: MovieDetails | null }>()
);
export const loadSelectedMovieByIdFailure = createAction(
  '[SelectedMovieById] load Selected Movie By Id Failure',
  props<{ error: any }>()
);
// отримання вибраного серіала за його id
export const loadSelectedSeriesById = createAction(
  '[SelectedSeriesById] load Selected Series By Id',
  props<{ id: number; mediaType: string }>()
);
export const loadSelectedSeriesByIdSuccess = createAction(
  '[SelectedSeriesById] load Selected Series By Id Success',
  props<{ selectedSeriesById: SeriesDetails | null }>()
);
export const loadSelectedSeriesByIdFailure = createAction(
  '[SelectedSeriesById] load Selected Series By Id Failure',
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

// отримання деталів про команду фільму
export const loadMovieOrSerieDetailsTeam = createAction(
  '[MovieOrSerieDetailsTeam] load Movie Or Serie Details Team',
  props<{ movieId: number; mediaType: string }>()
);
export const loadMovieOrSerieDetailsTeamSuccess = createAction(
  '[MovieOrSerieDetailsTeam] load Movie Or Serie Details Team Success',
  props<{ getMovieOrSerieDetailsTeam: MovieDetailsTeam | null }>()
);
export const loadMovieOrSerieDetailsTeamFailure = createAction(
  '[MovieOrSerieDetailsTeamType] load Movie Or Serie Details Team Failure',
  props<{ error: any }>()
);

// отримання ідентифікаторів соц.мереж
export const loadExternalIDs = createAction(
  '[ExternalIDs] load External IDs',
  props<{ movieId: number; mediaType: string }>()
);
export const loadExternalIDsSuccess = createAction(
  '[ExternalIDs] load External IDs Success',
  props<{ getExternalIDs: ExternalIds | null }>()
);
export const loadExternalIDsFailure = createAction(
  '[ExternalIDs] load External IDs Failure',
  props<{ error: any }>()
);

// отримання жанрів
export const loadGenres = createAction(
  '[Genres] load Genres',
  props<{ typeGenresList: string }>()
);
export const loadGenresSuccess = createAction(
  '[Genres] load Genres Success',
  props<{ getGenres: GenresList | null }>()
);
export const loadGenresFailure = createAction(
  '[Genres] load Genres Failure',
  props<{ error: any }>()
);

// завантаження фільмів або серіалів
export const loadSelectMoviesOrSeries = createAction(
  '[Movies or Series] load Select Movies Or Series',
  props<{
    typeMedia: string;
    params: GetParams;
  }>()
);
export const loadSelectMoviesOrSeriesSuccess = createAction(
  '[Movies or Series] load Select Movies Or Series Success',
  props<{ selectMoviesOrSeries: MovieInfo[] | SeriesInfo[] | null }>()
);
export const loadSelectMoviesOrSeriesFailure = createAction(
  '[Movies or Series] load Select Movies Or Series Failure',
  props<{ error: any }>()
);
// пошук фільмів та серіалів
export const loadResultSearchMoviesOrSeries = createAction(
  '[Search Movies or Series] load Result Search Movie Or Series',
  props<{
    typeMedia: string;
    query: string;
  }>()
);
export const loadResultSearchsMovieOrSeriesSuccess = createAction(
  '[Search Movies or Series] lload Result Search Movie Or Series Success',
  props<{ searchMoviesOrSeries: MovieInfo[] | SeriesInfo[] | null }>()
);
export const loadResultSearchMoviesOrSeriesFailure = createAction(
  '[Search Movies or Series] load Result Search Movie Or Series Failure',
  props<{ error: any }>()
);
