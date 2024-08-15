import { MovieInfo } from '../movie-info.type';
import { SeriesInfo } from '../series-info';
import { Person } from './person';

export type SearchResults = {
  movie: MovieInfo[];
  tv: SeriesInfo[];
  person: Person[];
};
