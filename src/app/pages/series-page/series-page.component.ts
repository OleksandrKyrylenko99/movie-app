import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MediaPageComponent } from '../../components/media-page/media-page.component';
import { Store } from '@ngrx/store';
import { SeriesInfo } from '../../types/series-info';
import { selectMediaSeries } from '../../store/selectors';
import { loadSelectMediaSeries } from '../../store/actions';
import { MovieService } from '../../service/movie/movie.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { MovieListComponent } from '../../components/movies/movie-list/movie-list.component';
import { NotFindComponent } from '../../components/not-find/not-find.component';
import { GetParams } from '../../types/get-params-media';

@Component({
  selector: 'app-series-page',
  standalone: true,
  imports: [
    MediaPageComponent,
    LoaderComponent,
    MovieListComponent,
    NotFindComponent,
  ],
  templateUrl: './series-page.component.html',
  styleUrl: './series-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeriesPageComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
