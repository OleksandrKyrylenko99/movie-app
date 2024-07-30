import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SelectedMovieService } from '../../../service/selected-movie/selected-movie.service';
import { PATH_IMAGE } from '../../../constants/path-image';
import { LoaderComponent } from '../../loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieInfo } from '../../../types/movie-info.type';
import { RoundRatingPipe } from '../../../pipes/round-rating/round-rating.pipe';
import { ExtractYearPipe } from '../../../pipes/extract-year/extract-year.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-selected-movie-list',
  standalone: true,
  imports: [
    MatIcon,
    LoaderComponent,
    MatProgressSpinnerModule,
    RoundRatingPipe,
    ExtractYearPipe,
    RouterLink,
  ],
  templateUrl: './selected-movie-list.component.html',
  styleUrl: './selected-movie-list.component.scss',
})
export class SelectedMovieListComponent {
  @Input() movieData!: MovieInfo[];
  @Input() hasDelete!: boolean;
  @Output() remove = new EventEmitter();
  path = PATH_IMAGE;
  constructor(public movieListService: SelectedMovieService) {}
  removeMovie(id: number) {
    this.remove.emit(id);
  }
}
