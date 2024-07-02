import { Component, Input, OnInit, input, signal } from '@angular/core';
import { MovieInfo } from '../../types/movie-info.type';
import { ActivatedRoute } from '@angular/router';
import { TimeFormat } from '../../pipes/time-format/time-format.pipe';

@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss',
  imports: [TimeFormat],
})
export class MovieDetailsPageComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  movie!: MovieInfo;
  ngOnInit() {
    this.movie = this.route.snapshot.data['currentMovie'];
  }
}
