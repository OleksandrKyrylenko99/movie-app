import { SelectMovieListType } from './select-movie.type';

export type Movie = {
  backdrop_path: string;
  id: number;
  title: string;
  release_year: string;
  vote_average: string;
  duration_movie: string;
  selectType: SelectMovieListType;
};
