import { MovieInfo } from '../../types/movie-info.type';

export interface MovieApiModel {
  page: number;
  results: MovieInfo[];
  total_pages: number;
  total_results: number;
}
