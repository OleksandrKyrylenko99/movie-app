import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectedMovieService } from '../../service/selected-movie/selected-movie.service';
import { RouterLink } from '@angular/router';
import { MovieHeaderSelectedListComponent } from '../movie-selected-list/movie-header-selected-list/movie-header-select-list.component';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MovieHeaderSelectedListComponent,
    FormsModule,
    NgClass,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  movieList = toSignal(this.selectedMovieService.movieList.valueChanges, {
    initialValue: {
      favouriteList: [],
      watchList: [],
    },
  });
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private selectedMovieService: SelectedMovieService) {}

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}
