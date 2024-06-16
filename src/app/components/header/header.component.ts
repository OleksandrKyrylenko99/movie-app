import { Component, HostListener, Input } from '@angular/core';
import { MovieSelectListComponent } from '../movie-select-list/movie-select-list.component';
import { MovieList } from '../../types/movie-object-list.type';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MovieSelectListComponent, FormsModule, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() movieList: MovieList = {
    favouriteList: [],
    watchList: [],
  };
}
