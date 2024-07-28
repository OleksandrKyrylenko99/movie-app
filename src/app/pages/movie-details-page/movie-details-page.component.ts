import { Component, input } from '@angular/core';
import { TimeFormat } from '../../pipes/time-format/time-format.pipe';
import { PATH_IMAGE } from '../../constants/path-image';
import { LoaderComponent } from '../../components/loader/loader.component';
import { RoundRatingPipe } from '../../pipes/round-rating/round-rating.pipe';
import { ExtractYearPipe } from '../../pipes/extract-year/extract-year.pipe';
import { TitleCasePipe } from '@angular/common';
import { MovieDetails } from '../../interface/movie-details';

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
  ],
})
export class MovieDetailsPageComponent {
  path = PATH_IMAGE;
  currentMovie = input({} as MovieDetails);
  constructor() {}
}
