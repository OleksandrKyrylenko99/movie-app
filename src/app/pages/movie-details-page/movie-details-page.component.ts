import { Component, input } from '@angular/core';
import { MovieInfo } from '../../types/movie-info.type';
import { TimeFormat } from '../../pipes/time-format/time-format.pipe';

@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss',
  imports: [TimeFormat],
})
export class MovieDetailsPageComponent {
  currentMovie = input({} as MovieInfo);
}
