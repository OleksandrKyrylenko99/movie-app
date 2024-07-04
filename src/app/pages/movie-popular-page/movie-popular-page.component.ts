import { Component, Input, OnInit } from '@angular/core';
import { MovieInfo } from '../../types/movie-info.type';
import { MovieListComponent } from '../../components/movies/movie-list/movie-list.component';
import { MovieService } from '../../service/movie/movie.service';

@Component({
  selector: 'app-movie-popular-page',
  standalone: true,
  imports: [MovieListComponent],
  templateUrl: './movie-popular-page.component.html',
  styleUrl: './movie-popular-page.component.scss',
})
export class MoviePopularPageComponent implements OnInit {
  movieData!: MovieInfo[];
  @Input() customClass: string = '';
  constructor(private moviesService: MovieService) {}
  ngOnInit(): void {
    this.movieData = this.moviesService.getPopularMovies();
  }
}
