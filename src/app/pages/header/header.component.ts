import { Component, inject } from '@angular/core';
import { MovieFormService } from '../../service/movie-service/movie-form.service';
import { AddedMovieComponent } from '../../components/added-movie/components/added-movie/added-movie/added-movie.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AddedMovieComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  form = inject(MovieFormService).form.controls
}
