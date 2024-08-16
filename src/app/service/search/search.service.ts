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
  getMediaSearch(
    query: string,
    typeMedia: string
  ): Observable<Person[] | MovieInfo[] | SeriesInfo[]> {
    return this._http
      .get<any>(
        `${environment.dbSearchUrl}/${typeMedia}?query=${query}&api_key=${environment.apiKey}`
      )
      .pipe(map((response) => response.results));
  }
  generalSearch(query: string) {
    const searchMovie = this.getMediaSearch(query, 'movie');
    const searchTv = this.getMediaSearch(query, 'tv');
    const searchPerson = this.getMediaSearch(query, 'person');
    return forkJoin({
      movie: searchMovie,
      tv: searchTv,
      person: searchPerson,
    });
  }
}
