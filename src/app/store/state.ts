import { MovieDetails } from '../interface/movie-details';
import { MovieDetailsTeam } from '../interface/movie-details-team';
import { ExternalIds } from '../types/externalIds';
import { GenresList } from '../types/genres';
import { MovieInfo } from '../types/movie-info.type';

export interface MovieState {
  moviesList: MovieInfo[] | null;
  selectedMovieById: MovieDetails | null;
  selectedMoviesListByType: MovieInfo[] | null;
  addMovieToListOfSelectedByType: null;
  removeMovieToListOfSelectedByType: MovieInfo | null;
  getDetailsMovieTeam: MovieDetailsTeam | null;
  getExternalIDs: ExternalIds | null;
  genresList: GenresList | null;
}

export const initialState: MovieState = {
  moviesList: null,
  selectedMovieById: null,
  selectedMoviesListByType: null,
  addMovieToListOfSelectedByType: null,
  removeMovieToListOfSelectedByType: null,
  getDetailsMovieTeam: null,
  getExternalIDs: null,
  genresList: null,
};
