import { MovieDetails } from '../interface/movie-details';
import { MovieDetailsTeam } from '../interface/movie-details-team';
import { SeriesDetails } from '../interface/series-details';
import { ExternalIds } from '../types/externalIds';
import { GenresList } from '../types/genres';
import { MovieInfo } from '../types/movie-info.type';
import { SeriesInfo } from '../types/series-info';

export interface MovieState {
  moviesList: MovieInfo[] | null;
  selectedMovieById: MovieDetails | null;
  selectedSeriesById: SeriesDetails | null;
  selectedMoviesListByType: MovieInfo[] | null;
  addMovieToListOfSelectedByType: null;
  removeMovieToListOfSelectedByType: MovieInfo | null;
  getDetailsMovieOrSerieTeam: MovieDetailsTeam | null;
  getExternalIDs: ExternalIds | null;
  genresList: GenresList | null;
  selectMediaMovies: MovieInfo[] | null;
  selectMediaSeries: SeriesInfo[] | null;
}

export const initialState: MovieState = {
  moviesList: null,
  selectedMovieById: null,
  selectedMoviesListByType: null,
  addMovieToListOfSelectedByType: null,
  removeMovieToListOfSelectedByType: null,
  getDetailsMovieOrSerieTeam: null,
  getExternalIDs: null,
  genresList: null,
  selectMediaMovies: null,
  selectMediaSeries: null,
  selectedSeriesById: null,
};
