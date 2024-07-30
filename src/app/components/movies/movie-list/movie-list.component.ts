import { Component, Input, OnInit } from '@angular/core';
import { SelectedMovieService } from '../../../service/selected-movie/selected-movie.service';
import { Movie } from '../../../types/movie.type';
import { SelectMovieListType } from '../../../types/select-movie.type';
import { MovieInfo } from '../../../types/movie-info.type';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { NgClass } from '@angular/common';
import { MovieService } from '../../../service/movie/movie.service';
import { LoaderComponent } from '../../loader/loader.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [MovieCardComponent, NgClass, LoaderComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss',
})
export class MovieListComponent {
  @Input() movies!: MovieInfo[];
  @Input() title!: string;
  @Input() customClass: string = '';

  constructor(public moviesService: MovieService) {}
}
