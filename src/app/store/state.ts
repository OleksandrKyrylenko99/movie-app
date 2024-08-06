import { MovieDetails } from '../interface/movie-details';
import { MovieInfo } from '../types/movie-info.type';

export interface MovieState {
  moviesList: MovieInfo[] | null;
  selectedMovieById: MovieDetails | null;
  selectedMoviesListByType: MovieInfo[] | null;
  addMovieToListOfSelectedByType: null;
  removeMovieToListOfSelectedByType: MovieInfo | null;
}

export const initialState: MovieState = {
  moviesList: null,
  selectedMovieById: null,
  selectedMoviesListByType: null,
  addMovieToListOfSelectedByType: null,
  removeMovieToListOfSelectedByType: null,
};
