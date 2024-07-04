import { Component, Input, OnInit } from '@angular/core';
import { MovieInfo } from '../../types/movie-info.type';
import { RouterOutlet } from '@angular/router';
import { MovieListComponent } from '../../components/movies/movie-list/movie-list.component';
import { MovieService } from '../../service/movie/movie.service';

@Component({
  selector: 'app-all-movie',
  standalone: true,
  imports: [RouterOutlet, MovieListComponent],
  templateUrl: './all-movie-page.component.html',
  styleUrl: './all-movie-page.component.scss',
})
export class AllMoviePageComponent implements OnInit {
  movieData!: MovieInfo[];
  constructor(private moviesService: MovieService) {}
  ngOnInit(): void {
    this.movieData = this.moviesService.getAllMovies();
  }
}
