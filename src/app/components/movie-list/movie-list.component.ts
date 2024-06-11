import { Component, Input } from '@angular/core';
import { MovieList } from '../../types/movie-list.types';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  @Input() data! : MovieList[]
}
