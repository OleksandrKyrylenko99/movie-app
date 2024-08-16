import { Routes } from '@angular/router';
import { MoviePopularPageComponent } from './pages/movie-popular-page/movie-popular-page.component';
import { MovieTopRatingPageComponent } from './pages/movie-top-rating-page/movie-top-rating-page.component';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MainLayoutPageComponent } from './pages/main-layout-page/main-layout-page.component';
import { authGuard } from './guards/auth.guard';
import { WatchListMoviePageComponent } from './pages/watch-list-movie-page/watch-list-movie-page.component';
import { FavouriteMoviePageComponent } from './pages/favourite-movie-page/favourite-movie-page.component';
import { loadMovieOrSerieByIdResolver } from './resolvers/load-movie-or-series-by-id/load-movie-or-series-by-id.resolver';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { NowPlayingMoviePageComponent } from './pages/now-playing-movie-page/now-playing-movie-page.component';
import { loadMovieDataResolver } from './resolvers/resolve-movie-data/load-movie-data.resolver';
import { genresResolver } from './resolvers/genres/genres.resolver';
import { MoviePageComponent } from './pages/movie-page/movie-page.component';
import { SeriesPageComponent } from './pages/series-page/series-page.component';
import { SeriesDetailsPageComponent } from './pages/series-details-page/series-details-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

export const routes: Routes = [
  {
    path: 'authenticate',
    component: AuthPageComponent,
    canActivate: [authGuard({ isAuthentication: false, otherwise: '' })],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutPageComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
        resolve: { genre: genresResolver },
      },
      {
        path: 'movie-now-playing',
        component: NowPlayingMoviePageComponent,
        resolve: {
          currentCategoryMovie: loadMovieDataResolver,
        },
        data: {
          categoryType: 'now_playing',
          mediaType: 'movie',
        },
      },
      {
        path: 'movie-popular',
        component: MoviePopularPageComponent,
        resolve: {
          currentCategoryMovie: loadMovieDataResolver,
        },
        data: {
          categoryType: 'popular',
          mediaType: 'movie',
        },
      },

      {
        path: 'movie-top-rating',
        component: MovieTopRatingPageComponent,
        resolve: {
          currentCategoryMovie: loadMovieDataResolver,
        },
        data: {
          categoryType: 'top_rated',
          mediaType: 'movie',
        },
      },
      {
        path: 'movie-details/:id',
        component: MovieDetailsPageComponent,
        resolve: { currentMovie: loadMovieOrSerieByIdResolver },
        data: {
          mediaType: 'movie',
        },
      },
      {
        path: 'tv-details/:id',
        component: SeriesDetailsPageComponent,
        resolve: { currentMovie: loadMovieOrSerieByIdResolver },
        data: {
          mediaType: 'tv',
        },
      },
      {
        path: 'watch-list-movie',
        component: WatchListMoviePageComponent,
        canActivate: [
          authGuard({ isAuthentication: true, otherwise: '/authenticate' }),
        ],
      },
      {
        path: 'favourite-movie',
        component: FavouriteMoviePageComponent,
        canActivate: [
          authGuard({ isAuthentication: true, otherwise: '/authenticate' }),
        ],
      },
      {
        path: 'movie',
        component: MoviePageComponent,
        resolve: { genre: genresResolver },
        data: {
          typePage: 'movie',
        },
      },
      {
        path: 'series',
        component: SeriesPageComponent,
        resolve: { genre: genresResolver },
        data: {
          typePage: 'tv',
        },
      },
      {
        path: 'search',
        component: SearchPageComponent,
      },
    ],
  },
];
