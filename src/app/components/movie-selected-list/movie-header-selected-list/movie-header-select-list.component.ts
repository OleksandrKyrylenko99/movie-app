import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SelectedMovieService } from '../../../service/selected-movie/selected-movie.service';
import { TitleCaseWordsPipe } from '../../../pipes/title-words/title-case-words.pipe';
import { TimeFormat } from '../../../pipes/time-format/time-format.pipe';
import { Movie } from '../../../types/movie.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-header-selected-list',
  standalone: true,
  imports: [TitleCaseWordsPipe, TimeFormat, MatIcon, RouterLink],
  templateUrl: './movie-header-selected-list.component.html',
  styleUrl: './movie-header-selected-list.component.scss',
})
export class MovieHeaderSelectedListComponent {
  constructor(private movieListService: SelectedMovieService) {}
  @Input() data!: Movie[];
  deleteMovie(movie: Movie) {
    // console.log(this.data, 'data');

    this.data = this.data.filter((m) => m.id !== movie.id);
    // console.log(this.data, 'data-1');
    this.movieListService.remove(movie);
    // console.log(
    //   this.movieListService.movieList.controls.favouriteList.value,
    //   'favourite'
    // );
    // console.log(
    //   this.movieListService.movieList.controls.watchList.value,
    //   'watchlist'
    // );
    // console.log(movie);

    // let selectType!: SelectMovieListType;
    // for (const movie of selectedMovie) {
    //   selectType = movie.selectType;
    //   console.log(selectType);
    // }
    // const movieValueList =
    //   this.movieListService.movieList.controls[selectType].value;
    // const ind = movieValueList.findIndex((m) => m.id ===);
    // if (ind >= 0) {
    //   movieValueList.splice(ind, 1);
    //   return;
    // }
    // this.movieListService.remove(selectedMovie);
    // console.log(this.data);
  }
}
