import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MovieActions from './actions';
import {
  catchError,
  debounceTime,
  finalize,
  map,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';
import { MediaManagementService } from '../service/media-management/media-management.service';
import { SearchService } from '../service/search/search.service';
import { MovieInfo } from '../types/movie-info.type';
import { SeriesInfo } from '../types/series-info';

@Injectable()
export class MovieEffects {
  // запит на отримання фільмів за категоріями
  loadMoviesList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadMoviesList),
      mergeMap((props) => {
        this.MediaManagementService.isShowLoaderSignal.set(true);
        return this.MediaManagementService.getMoviesByCategories(
          props.mediaType,
          props.category
        ).pipe(
          map((movies) =>
            MovieActions.loadMoviesListSuccess({
              moviesList: movies.results,
            })
          ),
          catchError((error) =>
            of(MovieActions.loadMoviesListFailure({ error }))
          ),
          finalize(() =>
            this.MediaManagementService.isShowLoaderSignal.set(false)
          )
        );
      })
    )
  );

  // запит на отримання вибраного фільму за його id
  loadSelectedMovieById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadSelectedMovieById),
      mergeMap((props) => {
        this.MediaManagementService.isShowLoaderSignal.set(true);
        return this.MediaManagementService.getMovieOrSeriesById(
          props.id,
          props.mediaType
        ).pipe(
          map((movie) =>
            MovieActions.loadSelectedMovieByIdSuccess({
              selectedMovieById: movie,
            })
          ),
          catchError((error) =>
            of(MovieActions.loadSelectedMovieByIdFailure({ error }))
          ),
          finalize(() =>
            this.MediaManagementService.isShowLoaderSignal.set(false)
          )
        );
      })
    )
  );
  // запит на отримання вибраного серіалу за його id
  loadSelectedSeriesById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadSelectedSeriesById),
      mergeMap((props) => {
        this.MediaManagementService.isShowLoaderSignal.set(true);
        return this.MediaManagementService.getMovieOrSeriesById(
          props.id,
          props.mediaType
        ).pipe(
          map((movie) =>
            MovieActions.loadSelectedSeriesByIdSuccess({
              selectedSeriesById: movie,
            })
          ),
          catchError((error) =>
            of(MovieActions.loadSelectedSeriesByIdFailure({ error }))
          ),
          finalize(() =>
            this.MediaManagementService.isShowLoaderSignal.set(false)
          )
        );
      })
    )
  );
  // запит на отримання списку вибраних фільмів за їх типами
  loadSelectedMoviesListByType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadSelectedMoviesListByType),
      mergeMap((props) => {
        this.MediaManagementService.isShowLoaderSignal.set(true);
        return this.MediaManagementService.getSelectedMoviesListByType(
          props.typeMoviesList
        ).pipe(
          map((movieList) =>
            MovieActions.loadSelectedMoviesListByTypeSuccess({
              selectedMoviesListByType: movieList,
            })
          ),
          catchError((error) =>
            of(MovieActions.loadSelectedMovieByIdFailure({ error }))
          ),
          finalize(() =>
            this.MediaManagementService.isShowLoaderSignal.set(false)
          )
        );
      })
    )
  );
  // запит на додавання фільму до списку вибраних
  addMovieToSelectedList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.addMovieToSelectedList),
      switchMap((props) =>
        this.MediaManagementService.addMovieToSelectedListByItsType(
          props.movieId,
          props.typeOfSelectedMovieList
        ).pipe(
          map(() =>
            MovieActions.addMovieToSelectedListSuccess({
              addMovieToListOfSelectedByType: null,
            })
          ),
          catchError((error) =>
            of(MovieActions.addMovieToSelectedListFailure({ error }))
          )
        )
      )
    )
  );
  // видалення фільму з списку вибраних
  removeMovieToSelectedList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.removeMovieToSelectedList),
      switchMap((props) => {
        this.MediaManagementService.isShowLoaderSignal.set(true);
        return this.MediaManagementService.removeMovieFromListOfSelectedByType(
          props.movieId,
          props.typeOfSelectedMovieList!
        ).pipe(
          map(() =>
            MovieActions.removeMovieToSelectedListSuccess({
              movieId: props.movieId,
            })
          ),
          catchError((error) =>
            of(MovieActions.removeMovieToSelectedListFailure({ error }))
          ),
          finalize(() =>
            this.MediaManagementService.isShowLoaderSignal.set(false)
          )
        );
      })
    )
  );
  // отримання деталів про команду фільму
  loadMoviesOrSerieDetailsTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadMovieOrSerieDetailsTeam),
      mergeMap((props) => {
        this.MediaManagementService.isShowLoaderSignal.set(true);
        return this.MediaManagementService.getMovieDetailsTeam(
          props.movieId,
          props.mediaType
        ).pipe(
          map((res) =>
            MovieActions.loadMovieOrSerieDetailsTeamSuccess({
              getMovieOrSerieDetailsTeam: res,
            })
          ),
          catchError((error) =>
            of(MovieActions.loadMovieOrSerieDetailsTeamFailure({ error }))
          ),
          finalize(() =>
            this.MediaManagementService.isShowLoaderSignal.set(false)
          )
        );
      })
    )
  );

  // отримання ідентифікаторів соц.мереж
  loadExternalIDs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadExternalIDs),
      switchMap((props) =>
        this.MediaManagementService.getExternalIDs(
          props.movieId,
          props.mediaType
        ).pipe(
          map((res) => {
            console.log(res);

            return MovieActions.loadExternalIDsSuccess({ getExternalIDs: res });
          }),
          catchError((error) =>
            of(MovieActions.loadExternalIDsFailure({ error: error }))
          )
        )
      )
    )
  );
  // отримання жанрів
  loadGenres$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadGenres),
      switchMap((props) =>
        this.MediaManagementService.getGenresList(props.typeGenresList).pipe(
          map((res) => {
            return MovieActions.loadGenresSuccess({ getGenres: res });
          }),
          catchError((error) =>
            of(MovieActions.loadGenresFailure({ error: error }))
          )
        )
      )
    )
  );

  // завантаження фільмів або серіалів
  loadSelectMoviesOrSeries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadSelectMoviesOrSeries),
      mergeMap((props) => {
        this.MediaManagementService.isShowLoaderSignal.set(true);
        return this.MediaManagementService.getMediaList(
          props.typeMedia,
          props.params
        ).pipe(
          map((res) => {
            return MovieActions.loadSelectMoviesOrSeriesSuccess({
              selectMoviesOrSeries: res,
            });
          }),
          catchError((error) =>
            of(MovieActions.loadSelectMoviesOrSeriesFailure({ error: error }))
          ),
          // debounceTime(500),
          finalize(() =>
            this.MediaManagementService.isShowLoaderSignal.set(false)
          )
        );
      })
    )
  );

  loadResultSearchMoviesOrSeries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadResultSearchMoviesOrSeries),
      mergeMap((props) => {
        this.MediaManagementService.isShowLoaderSignal.set(true);
        return this.searchService
          .getMediaSearch(props.query, props.typeMedia)
          .pipe(
            map((res) => {
              return MovieActions.loadResultSearchsMovieOrSeriesSuccess({
                searchMoviesOrSeries: res as MovieInfo[] | SeriesInfo[],
              });
            }),
            catchError((error) =>
              of(
                MovieActions.loadResultSearchMoviesOrSeriesFailure({
                  error: error,
                })
              )
            ),
            finalize(() =>
              this.MediaManagementService.isShowLoaderSignal.set(false)
            )
          );
      })
    )
  );
  constructor(
    private actions$: Actions,
    private MediaManagementService: MediaManagementService,
    private searchService: SearchService
  ) {}
}
