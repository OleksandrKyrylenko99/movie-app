import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, finalize, map } from 'rxjs';
import { MovieApiModel } from '../../interface/movie-api-model/movie-api-model.interface';
import { environment } from '../../../environments/environment';
import { MovieDetails } from '../../interface/movie-details';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  showLoader = signal(false);
  accountId: number | null = null;
  constructor(private http: HttpClient) {}
  getMovies(categoryType: string): Observable<MovieApiModel> {
    this.showLoader.set(true);
    return this.http
      .get<MovieApiModel>(
        `${environment.dbUrl}/movie/${categoryType}${environment.apiKey}`
      )
      .pipe(
        map((response) => {
          const validMovies = response.results.filter(
            (movie) => movie.backdrop_path !== null
          );
          const newResponse = { ...response, results: validMovies };
          return newResponse;
        }),
        catchError((err: HttpErrorResponse) => {
          throw new Error(err.message);
        }),
        finalize(() => {
          this.showLoader.set(false);
        })
      );
  }
  getMovieById(id: number): Observable<MovieDetails> {
    return this.http
      .get<MovieDetails>(
        `${environment.dbUrl}/movie/${id}${environment.apiKey}`
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          throw new Error(err.message);
        })
      );
  }
}
