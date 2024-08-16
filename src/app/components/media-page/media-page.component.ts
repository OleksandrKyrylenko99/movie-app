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
import { MediaManagementService } from '../../service/media-management/media-management.service';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgClass } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { MovieListComponent } from '../movies/movie-list/movie-list.component';
import { MovieInfo } from '../../types/movie-info.type';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  loadResultSearchMoviesOrSeries,
  loadSelectMoviesOrSeries,
} from '../../store/actions';
import {
  selectMoviesOrSeries,
  selectMoviesOrSeriesSearch,
} from '../../store/selectors';
import { NotFindComponent } from '../not-find/not-find.component';
import { SeriesInfo } from '../../types/series-info';
import { GetParams } from '../../types/get-params-media';
import { ClearObservableDirective } from '../../shared/clear-observable/clear-observable.directive';
import { takeUntil, tap } from 'rxjs';
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
    public MediaManagementService: MediaManagementService,
    private store: Store,
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
  searchMedia(searchStr: string) {
    if (!searchStr.length || !searchStr.trim()) {
      this.getMediaList();
      return;
    } else {
      this.store.dispatch(
        loadResultSearchMoviesOrSeries({
          typeMedia: this.typeMedia,
          query: searchStr,
        })
      );
    }
    this.searchByMediaType();
  }
  searchByMediaType() {
    this.store
      .select(selectMoviesOrSeriesSearch)
      .pipe(
        takeUntil(this.destroy$),
        tap((res) => {
          if (res) {
            this.handleMediaResponse(res);
            this.cdr.detectChanges();
          }
        })
      )
      .subscribe();
  }

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
    this.store.dispatch(
      loadSelectMoviesOrSeries({ typeMedia: this.typeMedia, params: params })
    );
    this.showByMediaType();
  }

  showByMediaType() {
    this.store
      .select(selectMoviesOrSeries)
      .pipe(
        takeUntil(this.destroy$),
        tap((res) => {
          if (res) {
            this.handleMediaResponse(res);
          }
        })
      )
      .subscribe();
  }
  handleMediaResponse(response: MovieInfo[] | SeriesInfo[]) {
    if (this.typeMedia === 'movie') {
      this.dataMovie = response as MovieInfo[];
      this.emptyData.set(!Boolean(response.length));
    } else {
      this.dataSeries = response as SeriesInfo[];
      this.emptyData.set(!Boolean(response.length));
    }
  }
}
