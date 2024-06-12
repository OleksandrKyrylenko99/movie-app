import { Component, Input } from '@angular/core';
import { Movie } from '../../types/movie.type';

@Component({
  selector: 'app-movie-select-list',
  standalone: true,
  imports: [],
  templateUrl: './movie-select-list.component.html',
  styleUrl: './movie-select-list.component.scss'
})
export class MovieSelectListComponent {
  @Input() data! : Movie[]
}
