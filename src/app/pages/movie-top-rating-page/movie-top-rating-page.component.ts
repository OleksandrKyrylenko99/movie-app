import { Component, OnInit } from '@angular/core';
import { MovieInfo } from '../../types/movie-info.type';
import { MovieListComponent } from '../../components/movies/movie-list/movie-list.component';
import { MovieService } from '../../service/movie/movie.service';

@Component({
  selector: 'app-movie-top-rating-page',
  standalone: true,
  imports: [MovieListComponent],
  templateUrl: './movie-top-rating-page.component.html',
  styleUrl: './movie-top-rating-page.component.scss',
})
export class MovieTopRatingPageComponent implements OnInit {
  constructor(private moviesService: MovieService) {}
  movieData!: MovieInfo[];
  ngOnInit(): void {
    this.movieData = this.moviesService.getMoviesWithTopRating();
  }
}
