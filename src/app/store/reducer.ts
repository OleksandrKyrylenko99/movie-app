import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import * as MovieActions from './actions';

export const MovieReducer = createReducer(
  initialState,

  // Початок завантаження даних. Потрібне для запобігання відображення минулого стану при відкритті нової сторінки
  on(
    MovieActions.loadMoviesList,
    MovieActions.loadSelectedMovieById,
    MovieActions.loadSelectedSeriesById,
    MovieActions.loadSelectedMoviesListByType,
    MovieActions.loadMovieOrSerieDetailsTeam,
    MovieActions.loadSelectMoviesOrSeries,
    MovieActions.loadResultSearchMoviesOrSeries,
    (state) => ({
      ...state,
      selectedMovieById: null,
      selectedSeriesById: null,
      moviesList: null,
      selectedMoviesListByType: null,
      getDetailsMovieOrSerieTeam: null,
      selectMoviesOrSeries: null,
      searchMoviesOrSeries: null,
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
  // Завантаження серіалу за його id завершено успішно
  on(
    MovieActions.loadSelectedSeriesByIdSuccess,
    (state, { selectedSeriesById }) => {
      return {
        ...state,
        selectedSeriesById: selectedSeriesById,
      };
    }
  ),
  // Завантаження фільму за його id  завершено з помилкою
  on(MovieActions.loadSelectedSeriesByIdFailure, (state, { error }) => {
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
  }),
  // успішне завантаження інформації про команду фільму
  on(
    MovieActions.loadMovieOrSerieDetailsTeamSuccess,
    (state, { getMovieOrSerieDetailsTeam }) => ({
      ...state,
      getDetailsMovieOrSerieTeam: getMovieOrSerieDetailsTeam,
    })
  ),
  // помилка при завантаженні інформації про команду фільму
  on(MovieActions.loadMovieOrSerieDetailsTeamFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
      getMovieOrSerieDetailsTeam: null,
    };
  }),
  // успішне завантаження ідентифікаторів соц.мереж
  on(MovieActions.loadExternalIDsSuccess, (state, { getExternalIDs }) => {
    return {
      ...state,
      getExternalIDs: getExternalIDs,
    };
  }),
  // помилка при завантаження ідентифікаторів соц.мереж
  on(MovieActions.loadExternalIDsFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
      getExternalIDs: null,
    };
  }),
  // успішне завантаження жанрів
  on(MovieActions.loadGenresSuccess, (state, { getGenres }) => {
    return {
      ...state,
      genresList: getGenres,
    };
  }),
  // помилка при завантаженні жанрів
  on(MovieActions.loadGenresFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
      getGenres: null,
    };
  }),

  // успішне завантаження фільмів або серіалів
  on(
    MovieActions.loadSelectMoviesOrSeriesSuccess,
    (state, { selectMoviesOrSeries }) => {
      return {
        ...state,
        selectMoviesOrSeries: selectMoviesOrSeries,
      };
    }
  ),
  // помилка при завантаженні фільмів або серіалів
  on(MovieActions.loadSelectMoviesOrSeriesFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
      selectMoviesOrSeries: null,
    };
  }),

  // успішний пошук фільмів та серіалів
  on(
    MovieActions.loadResultSearchsMovieOrSeriesSuccess,
    (state, { searchMoviesOrSeries }) => {
      return {
        ...state,
        searchMoviesOrSeries: searchMoviesOrSeries,
      };
    }
  ),
  // помилка при пошуку фільмів та серіалів
  on(MovieActions.loadResultSearchMoviesOrSeriesFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
      searchMoviesOrSeries: null,
    };
  })
);
