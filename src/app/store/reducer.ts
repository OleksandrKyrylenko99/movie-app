import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import * as MovieActions from './actions';

export const MovieReducer = createReducer(
  initialState,

  // Початок завантаження даних. Потрібне для запобігання відображення минулого стану при відкритті нової сторінки
  on(
    MovieActions.loadMoviesList,
    MovieActions.loadSelectedMovieById,
    MovieActions.loadSelectedMoviesListByType,
    (state) => ({
      ...state,
      selectedMovieById: null,
      moviesList: null,
      selectedMoviesListByType: null,
    })
  ),
  // успішне завантаження фільмів за категоріями
  on(MovieActions.loadMoviesListSuccess, (state, { moviesList }) => {
    return {
      ...state,
      moviesList: moviesList,
    };
  }),
  // помилка при завантаженні фільмів за категоріями
  on(MovieActions.loadMoviesListFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
      moviesList: null,
    };
  }),

  // Завантаження фільму за його id завершено успішно
  on(
    MovieActions.loadSelectedMovieByIdSuccess,
    (state, { selectedMovieById }) => {
      return {
        ...state,
        selectedMovieById: selectedMovieById,
      };
    }
  ),
  // Завантаження фільму за його id  завершено з помилкою
  on(MovieActions.loadSelectedMovieByIdFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),
  // Завантаження списку вибраних фільмів завершено успішно
  on(
    MovieActions.loadSelectedMoviesListByTypeSuccess,
    (state, { selectedMoviesListByType }) => {
      return {
        ...state,
        selectedMoviesListByType: selectedMoviesListByType,
      };
    }
  ),
  // Завантаження списку вибраних фільмів завершено з помилкою
  on(MovieActions.loadSelectedMoviesListByTypeFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),
  // додавання фільму до списку вибраних завершено успішно
  on(MovieActions.addMovieToSelectedListSuccess, (state) => {
    return {
      ...state,
    };
  }),
  // додавання фільму до списку вибраних завершено з помилкою
  on(MovieActions.addMovieToSelectedListFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),
  // видалення фільму з списку вибраних завершено успішно
  on(MovieActions.removeMovieToSelectedListSuccess, (state, id) => {
    const newMovieList =
      state.selectedMoviesListByType?.filter((mL) => mL.id !== id.movieId) ||
      null;
    return {
      ...state,
      selectedMoviesListByType: newMovieList,
    };
  }),
  // видалення фільму з списку вибраних завершено з помилкою
  on(MovieActions.removeMovieToSelectedListFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  })
);
