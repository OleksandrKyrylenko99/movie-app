import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimeFormat } from '../../pipes/time-format/time-format.pipe';
import {
  PATH_IMAGE,
  PATH_IMAGE_W300,
  PATH_ORIGINAL_IMAGE,
} from '../../constants/path-image';
import { LoaderComponent } from '../../components/loader/loader.component';
import { RoundRatingPipe } from '../../pipes/round-rating/round-rating.pipe';
import { ExtractYearPipe } from '../../pipes/extract-year/extract-year.pipe';
import {
  AsyncPipe,
  DecimalPipe,
  NgStyle,
  TitleCasePipe,
} from '@angular/common';
import { MovieDetails } from '../../interface/movie-details';
import { Store } from '@ngrx/store';
import {
  selectExternalIDs,
  selectMovieDetails,
  selectMovieDetailsTeam,
} from '../../store/selectors';
import { map, take, takeUntil } from 'rxjs';
import { ClearObservableDirective } from '../../shared/clear-observable/clear-observable.directive';
import { MovieService } from '../../service/movie/movie.service';
import { MatIcon } from '@angular/material/icon';
import { loadExternalIDs, loadMovieDetailsTeam } from '../../store/actions';
import { ActivatedRoute } from '@angular/router';
import { ActorsList } from '../../types/actors-list';
import { ExternalIds } from '../../types/externalIds';

@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss',
  imports: [
    TimeFormat,
    LoaderComponent,
    RoundRatingPipe,
    ExtractYearPipe,
    TitleCasePipe,
    AsyncPipe,
    NgStyle,
    MatIcon,
    RoundRatingPipe,
    DecimalPipe,
  ],
})
export class MovieDetailsPageComponent
  extends ClearObservableDirective
  implements OnInit, OnDestroy
{
  path = PATH_IMAGE;
  pathOriginalImage = PATH_ORIGINAL_IMAGE;
  pathW300 = PATH_IMAGE_W300;
  movie: MovieDetails | null = null;
  detailsTeam: ActorsList[] | null = null;
  externalId: ExternalIds | null = null;
  constructor(
    private store: Store,
    public movieService: MovieService,
    private router: ActivatedRoute
  ) {
    super();
  }
  ngOnInit(): void {
    this.loadPage();
    this.loadMovieDetailsTeam();
    this.store
      .select(selectExternalIDs)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.externalId = res;
        }
      });
  }
  loadPage() {
    this.store
      .select(selectMovieDetails)
      .pipe(takeUntil(this.destroy$))
      .subscribe((movie) => {
        if (movie) {
          console.log(movie);
          this.movie = movie;
        }
      });
  }
  loadMovieDetailsTeam() {
    this.store
      .select(selectMovieDetailsTeam)
      .pipe(
        map((details) => details?.cast?.slice(0, 4)),
        takeUntil(this.destroy$)
      )
      .subscribe((details) => {
        if (details) {
          this.detailsTeam = details;
        }
      });
  }
  openSocialMedia(nameSocialMedia: string, externalId: string) {
    window.open(`https://www.${nameSocialMedia}.com/${externalId}`);
  }
  showAllCrew() {}
  getBackgroundGradient(value: number): string {
    const degree = (value / 10) * 360;
    return `conic-gradient(#f15667 ${degree}deg, #424a4c 0deg)`;
  }
}
