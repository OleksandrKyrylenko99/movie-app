import { Component, inject } from '@angular/core';
import { MovieFormService } from '../../service/movie-service/movie-form.service';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MovieListComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  form = inject(MovieFormService).form.controls
}
