import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, take } from 'rxjs';
import { MovieApiModel } from '../../interface/movie-api-model/movie-api-model.interface';
import { environment } from '../../../environments/environment';
import { MovieDetails } from '../../interface/movie-details';
import { AuthService } from '../auth/auth.service';
import { MovieInfo } from '../../types/movie-info.type';
import { MovieDetailsTeam } from '../../interface/movie-details-team';
import { ExternalIds } from '../../types/externalIds';
import { GetParams } from '../../types/get-params-media';
import { SeriesDetails } from '../../interface/series-details';
import { bodyParams } from '../../helper/body-params';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // сигнал для відображення лоадера
  isShowLoaderSignal = signal(false);
  emptyData = signal(false);
  // accountId для роботи з вибраними фільмами
  accountId = this.authService.user
    .pipe(take(1))
    .subscribe((user) => user?.accountId);
  constructor(private _http: HttpClient, private authService: AuthService) {}

  // отримання списку фільмів за відповідною категорію(now_playing, popular,top_rated)
  getMoviesByCategories(
    mediaType: string,
    category: string
  ): Observable<MovieApiModel> {
    return this._http
      .get<MovieApiModel>(
        `${environment.dbUrl}/${mediaType}/${category}${environment.apiKey}`
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
  // отримання фільму/серіалу за його id
  getMovieOrSeriesById(id: number, mediaType: string): Observable<any> {
    return this._http
      .get<MovieDetails | SeriesDetails>(
        `${environment.dbUrl}/${mediaType}/${id}${environment.apiKey}`
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
        ? bodyParams(id).addFavoriteList
        : bodyParams(id).addWatchList
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
        ? bodyParams(id).removeFavoriteList
        : bodyParams(id).removeWatchList
    );
  }

  // отримання деталів про команду фільму
  getMovieDetailsTeam(
    id: number,
    mediaType: string
  ): Observable<MovieDetailsTeam> {
    return this._http
      .get<MovieDetailsTeam>(`${environment.dbUrl}/${mediaType}/${id}/credits`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          throw new Error(err.message);
        })
      );
  }
  // отримання ідентифікаторів соц.мереж
  getExternalIDs(id: number, mediaType: string): Observable<ExternalIds> {
    return this._http
      .get<ExternalIds>(`${environment.dbUrl}/${mediaType}/${id}/external_ids`)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          throw new Error(err.message);
        })
      );
  }
  // отримання списку жанрів
  getGenresList(typeGenresList: string): Observable<any> {
    return this._http.get<any>(
      `${environment.dbGenresUrl}/${typeGenresList}/list`
    );
  }
  // отримання фільмів або серіалів
  getMediaList(typeMedia: string, params: GetParams): Observable<any> {
    return this._http
      .get<any>(`${environment.dbUrl}/discover/${typeMedia}`, { params })
      .pipe(
        map((res) => {
          return res.results;
        })
      );
  }
}
