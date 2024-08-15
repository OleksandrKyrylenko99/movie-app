import { Component } from '@angular/core';
import { MovieOrSeriesDetailsComponent } from '../../components/movie-or-series-details/movie-or-series-details.component';

@Component({
  selector: 'app-series-details-page',
  standalone: true,
  imports: [MovieOrSeriesDetailsComponent],
  templateUrl: './series-details-page.component.html',
  styleUrl: './series-details-page.component.scss',
})
export class SeriesDetailsPageComponent {}
