import { MaybeAsync, ResolveFn } from '@angular/router';
import { MovieService } from '../../service/movie/movie.service';
import { inject } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { MovieDetails } from '../../interface/movie-details';

export const resolveMovieById: ResolveFn<MovieDetails> = (
  route
): Observable<MovieDetails> => {
  const movieId = route.params['id'];
  if (movieId) return inject(MovieService).getMovieById(movieId);
  else return EMPTY;
};
