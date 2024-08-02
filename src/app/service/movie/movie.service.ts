import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, finalize, map, take } from 'rxjs';
import { MovieApiModel } from '../../interface/movie-api-model/movie-api-model.interface';
import { environment } from '../../../environments/environment';
import { MovieDetails } from '../../interface/movie-details';
import { AuthService } from '../auth/auth.service';
import { MovieInfo } from '../../types/movie-info.type';
import { AddMovieToFavoritesResponse } from '../../types/add-movie-to-favorites-response';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // сигнал для відображення лоадера
  isShowLoaderSignal = signal(false);
  // accountId для роботи з вибраними фільмами
  accountId = this.authService.user
    .pipe(take(1))
    .subscribe((user) => user?.accountId);
  constructor(private _http: HttpClient, private authService: AuthService) {}
  bodyParams(id: number) {
    return {
      addFavoriteList: {
        media_type: 'movie',
        media_id: id,
        favorite: true,
      },
      addWatchList: {
        media_type: 'movie',
        media_id: id,
        watchlist: true,
      },
      removeFavoriteList: {
        media_type: 'movie',
        media_id: id,
        favorite: false,
      },
      removeWatchList: {
        media_type: 'movie',
        media_id: id,
        watchlist: false,
      },
    };
  }

  // отримання списку фільмів за відповідною категорію(now_playing, popular,top_rated)
  getMoviesByCategories(category: string): Observable<MovieApiModel> {
    return this._http
      .get<MovieApiModel>(
        `${environment.dbUrl}/movie/${category}${environment.apiKey}`
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
        })
      );
  }
  // отримання фільму за його id
  getMovieById(id: number): Observable<MovieDetails> {
    return this._http
      .get<MovieDetails>(
        `${environment.dbUrl}/movie/${id}${environment.apiKey}`
      )
      .pipe(
        catchError((err: HttpErrorResponse) => {
          throw new Error(err.message);
        })
      );
  }
  // додавання фільму до вибраних за його типом(favoriteList, watchList)
  addMovieToSelectedListByItsType(
    id: number,
    selectType: string
  ): Observable<void> {
    return this._http.post<void>(
      `${environment.dbAccountUrl}/${this.accountId}/${selectType}`,
      selectType === 'favorite'
        ? this.bodyParams(id).addFavoriteList
        : this.bodyParams(id).addWatchList
    );
  }
  // отримання списку вибраних за типами(favoriteList, watchList)
  getSelectedMoviesListByType(name: string): Observable<any> {
    return this._http
      .get<{ results: MovieInfo[] }>(
        `${environment.dbAccountUrl}/${this.accountId}/${name}/movies`
      )
      .pipe(
        map((res) => res.results),
        catchError((err: HttpErrorResponse) => {
          throw new Error(err.message);
        })
      );
  }
  // видалення фільму з списку вибраних за його типом(favoriteList, watchList)
  removeMovieFromListOfSelectedByType(
    id: number,
    selectType: string
  ): Observable<void> {
    return this._http.post<void>(
      `${environment.dbAccountUrl}/${this.accountId}/${selectType}`,
      selectType === 'favorite'
        ? this.bodyParams(id).removeFavoriteList
        : this.bodyParams(id).removeWatchList
    );
  }
}
