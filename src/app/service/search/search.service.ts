import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Person } from '../../types/search/person';
import { SeriesInfo } from '../../types/series-info';
import { MovieInfo } from '../../types/movie-info.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private _http: HttpClient) {}
  searchMovie(query: string): Observable<MovieInfo[]> {
    return this._http
      .get<any>(
        `${environment.dbSearchUrl}/movie?query=${query}&api_key=${environment.apiKey}`
      )
      .pipe(map((response) => response.results));
  }
  searchSeries(query: string): Observable<SeriesInfo[]> {
    return this._http
      .get<any>(
        `${environment.dbSearchUrl}/tv?query=${query}&api_key=${environment.apiKey}`
      )
      .pipe(map((response) => response.results));
  }
  searchPerson(query: string): Observable<Person[]> {
    return this._http
      .get<any>(
        `${environment.dbSearchUrl}/person?query=${query}&api_key=${environment.apiKey}`
      )
      .pipe(map((response) => response.results));
  }
  searchAll(query: string) {
    return forkJoin({
      movie: this.searchMovie(query),
      tv: this.searchSeries(query),
      person: this.searchPerson(query),
    });
  }
}
