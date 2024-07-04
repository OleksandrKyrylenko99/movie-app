import { Injectable } from '@angular/core';
import { MOVIE_DATA } from '../../models/all-movie-data';
import { POPULAR_MOVIES } from '../../models/popular-movie';
import { MOVIE_TOP_RATING } from '../../models/top-rating-movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor() {}
  getAllMovies() {
    return MOVIE_DATA;
  }
  getPopularMovies() {
    return POPULAR_MOVIES;
  }
  getMoviesWithTopRating() {
    return MOVIE_TOP_RATING;
  }
}
