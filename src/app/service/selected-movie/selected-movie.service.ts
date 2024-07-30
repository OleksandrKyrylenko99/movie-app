import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, map, Observable, take } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { MovieInfo } from '../../types/movie-info.type';

@Injectable({
  providedIn: 'root',
})
export class SelectedMovieService {
  showLoaderSignal = signal(false);
  constructor(private _http: HttpClient, private authService: AuthService) {}
  accountId = this.authService.user
    .pipe(take(1))
    .subscribe((user) => user?.accountId);

  addMovie(id: number, selectType: string): Observable<void> {
    const favoriteBodyParams = {
      media_type: 'movie',
      media_id: id,
      favorite: true,
    };
    const watchlistBodyParams = {
      media_type: 'movie',
      media_id: id,
      watchlist: true,
    };
    return this._http.post<void>(
      `${environment.dbAccountUrl}/${this.accountId}/${selectType}`,
      selectType === 'favorite' ? favoriteBodyParams : watchlistBodyParams
    );
  }
  getMovieList(name: string): Observable<any> {
    this.showLoaderSignal.set(true);
    return this._http
      .get<{ results: MovieInfo[] }>(
        `${environment.dbAccountUrl}/${this.accountId}/${name}/movies`
      )
      .pipe(
        map((res) => res.results),
        catchError((err: HttpErrorResponse) => {
          throw new Error(err.message);
        }),
        finalize(() => {
          this.showLoaderSignal.set(false);
        })
      );
  }
  removeMovie(id: number): Observable<any> {
    const bodyParams = {
      media_type: 'movie',
      media_id: id,
      favorite: false,
    };
    return this._http
      .post<{ results: MovieInfo[] }>(
        `${environment.dbAccountUrl}/${this.accountId}/favorite`,
        bodyParams
      )
      .pipe(map((res) => res.results));
  }
}
