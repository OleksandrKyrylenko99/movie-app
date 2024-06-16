import { Movie } from './movie.type';

export type MovieList = {
  favouriteList: Array<Movie>;
  watchList: Array<Movie>;
};