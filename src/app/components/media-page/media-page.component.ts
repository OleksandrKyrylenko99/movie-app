import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MovieService } from '../../service/movie/movie.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgClass } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { MovieListComponent } from '../movies/movie-list/movie-list.component';
import { MovieInfo } from '../../types/movie-info.type';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  loadSelectMediaMovies,
  loadSelectMediaSeries,
} from '../../store/actions';
import { selectMediaMovies, selectMediaSeries } from '../../store/selectors';
import { NotFindComponent } from '../not-find/not-find.component';
import { SeriesInfo } from '../../types/series-info';
import { GetParams } from '../../types/get-params-media';
import { ClearObservableDirective } from '../../shared/clear-observable/clear-observable.directive';
import { takeUntil } from 'rxjs';
import { MediaPageHeaderComponent } from '../media-page-header/media-page-header.component';
import { SearchService } from '../../service/search/search.service';

@Component({
  selector: 'app-media-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatIcon,
    MatButtonModule,
    NgClass,
    LoaderComponent,
    MovieListComponent,
    AsyncPipe,
    FormsModule,
    NotFindComponent,
    MediaPageHeaderComponent,
  ],
  templateUrl: './media-page.component.html',
  styleUrl: './media-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaPageComponent
  extends ClearObservableDirective
  implements OnInit
{
  dataMovie: MovieInfo[] | null = null;
  dataSeries!: SeriesInfo[] | null;
  hasError = false;
  emptyData = signal(false);
  @Input() typeMedia!: string;
  @Input() title!: string;
  constructor(
    public movieService: MovieService,
    private store: Store,
    private searchService: SearchService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }
  ngOnInit(): void {
    this.getMediaList();
  }
  filter(genres: string) {
    this.getMediaList(genres);
  }
  sort(typeSorting: string) {
    this.getMediaList('', typeSorting);
  }
  // метод не оптимальний, зробити рефакторинг та винести запит в store
  searchMedia(searchStr: string) {
    if (!searchStr.length) {
      this.getMediaList();
      return;
    }
    if (this.typeMedia === 'movie') {
      this.searchService
        .searchMovie(searchStr)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          if (res) {
            this.dataMovie = res;
            this.emptyData.set(!Boolean(res.length));
            this.cdr.detectChanges();
          }
        });
    } else {
      this.searchService
        .searchSeries(searchStr)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          if (res) {
            this.dataSeries = res;
            this.emptyData.set(!Boolean(res.length));
            this.cdr.detectChanges();
          }
        });
    }
  }
  // метод не оптимальний, зробити рефакторинг
  getMediaList(
    idGenre: string = '',
    sort_by: string = '',
    numPage: number = 1
  ) {
    const params: GetParams = {
      page: numPage,
      with_genres: idGenre,
      sort_by: sort_by,
    };
    if (this.typeMedia === 'movie') {
      this.store.dispatch(
        loadSelectMediaMovies({ typeMedia: this.typeMedia, params: params })
      );
      this.store.select(selectMediaMovies).subscribe(
        (res) => {
          if (res) {
            this.dataMovie = res;
            this.emptyData.set(!Boolean(res.length));
          }
        },
        (error) => (this.hasError = true)
      );
    } else {
      this.store.dispatch(
        loadSelectMediaSeries({ typeMedia: this.typeMedia, params: params })
      );
      this.store
        .select(selectMediaSeries)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (res) => {
            if (res) {
              this.dataSeries = res;
              this.emptyData.set(!Boolean(res.length));
            }
          },
          (error) => (this.hasError = true)
        );
    }
  }
}
