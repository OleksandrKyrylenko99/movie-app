import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { SelectedMovieService } from '../../../service/selected-movie/selected-movie.service';
import { Movie } from '../../../types/movie.type';
import { SelectMovieListType } from '../../../types/select-movie.type';
import { MovieInfo } from '../../../types/movie-info.type';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieCardComponent, NgClass],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  constructor(
    private selectedMovie: SelectedMovieService,
    private cdr: ChangeDetectorRef
  ) {}
  @Input() movies!: MovieInfo[];
  @Input() title!: string;
  @Input() customClass: string = '';
  updateMovie(event: { movie: Movie; selectType: SelectMovieListType }) {
    this.selectedMovie.movieList.controls[event.selectType].patchValue(
      [
        ...this.selectedMovie.movieList.controls[event.selectType].value,
        event.movie,
      ],
      { emitEvent: true }
    );
  }
}
