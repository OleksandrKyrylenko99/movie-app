import { Component, Input } from '@angular/core';
import { MovieList } from '../../../../../types/movie-list.types';

@Component({
  selector: 'app-added-movie',
  standalone: true,
  imports: [],
  templateUrl: './added-movie.component.html',
  styleUrl: './added-movie.component.scss'
})
export class AddedMovieComponent {
  @Input() data! : MovieList
}
