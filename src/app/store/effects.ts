import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MovieActions from './actions';
import { catchError, finalize, map, mergeMap, of, switchMap } from 'rxjs';
import { MovieService } from '../service/movie/movie.service';
import { props } from '@ngrx/store';

@Injectable()
export class MovieEffects {
  // запит на отримання фільмів за категоріями
  loadMoviesList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadMoviesList),
      mergeMap(({ category }) => {
        this.movieService.isShowLoaderSignal.set(true);
        return this.movieService.getMoviesByCategories(category).pipe(
          map((movies) =>
            MovieActions.loadMoviesListSuccess({
              moviesList: movies.results,
            })
          ),
          catchError((error) =>
            of(MovieActions.loadMoviesListFailure({ error }))
          ),
          finalize(() => this.movieService.isShowLoaderSignal.set(false))
        );
      })
    )
  );

  // запит на отримання вибраного фільму за його id
  loadSelectedMovieDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadSelectedMovieById),
      mergeMap((props) => {
        this.movieService.isShowLoaderSignal.set(true);
        return this.movieService.getMovieById(props.movieId).pipe(
          map((movie) =>
            MovieActions.loadSelectedMovieByIdSuccess({
              selectedMovieById: movie,
            })
          ),
          catchError((error) =>
            of(MovieActions.loadSelectedMovieByIdFailure({ error }))
          ),
          finalize(() => this.movieService.isShowLoaderSignal.set(false))
        );
      })
    )
  );
  // запит на отримання списку вибраних фільмів за їх типами
  loadSelectedMoviesListByType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadSelectedMoviesListByType),
      mergeMap((props) => {
        this.movieService.isShowLoaderSignal.set(true);
        return this.movieService
          .getSelectedMoviesListByType(props.typeMoviesList)
          .pipe(
            map((movieList) =>
              MovieActions.loadSelectedMoviesListByTypeSuccess({
                selectedMoviesListByType: movieList,
              })
            ),
            catchError((error) =>
              of(MovieActions.loadSelectedMovieByIdFailure({ error }))
            ),
            finalize(() => this.movieService.isShowLoaderSignal.set(false))
          );
      })
    )
  );
  // запит на додавання фільму до списку вибраних
  addMovieToSelectedList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.addMovieToSelectedList),
      switchMap((props) =>
        this.movieService
          .addMovieToSelectedListByItsType(
            props.movieId,
            props.typeOfSelectedMovieList
          )
          .pipe(
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
        this.movieService.isShowLoaderSignal.set(true);
        return this.movieService
          .removeMovieFromListOfSelectedByType(
            props.movieId,
            props.typeOfSelectedMovieList!
          )
          .pipe(
            map(() =>
              MovieActions.removeMovieToSelectedListSuccess({
                movieId: props.movieId,
              })
            ),
            catchError((error) =>
              of(MovieActions.removeMovieToSelectedListFailure({ error }))
            ),
            finalize(() => this.movieService.isShowLoaderSignal.set(false))
          );
      })
    )
  );
  // отримання деталів про команду фільму
  loadMovieDetailsTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadMovieDetailsTeam),
      mergeMap((props) => {
        this.movieService.isShowLoaderSignal.set(true);
        return this.movieService.getMovieDetailsTeam(props.movieId).pipe(
          map((res) =>
            MovieActions.loadMovieDetailsTeamSuccess({
              getMovieDetailsTeam: res,
            })
          ),
          catchError((error) =>
            of(MovieActions.loadMovieDetailsTeamFailure({ error }))
          ),
          finalize(() => this.movieService.isShowLoaderSignal.set(false))
        );
      })
    )
  );

  // отримання ідентифікаторів соц.мереж
  loadExternalIDs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadExternalIDs),
      switchMap((props) =>
        this.movieService.getExternalIDs(props.movieId).pipe(
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
        this.movieService.getGenresList(props.typeGenresList).pipe(
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
  constructor(private actions$: Actions, private movieService: MovieService) {}
}
