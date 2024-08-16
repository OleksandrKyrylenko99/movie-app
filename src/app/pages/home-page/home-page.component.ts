import { Component, OnInit } from '@angular/core';
import { MediaManagementService } from '../../service/media-management/media-management.service';
import { Store } from '@ngrx/store';
import { loadGenres } from '../../store/actions';
import { selectGenres } from '../../store/selectors';
import { Genres } from '../../types/movie-genres';
import { GenresList } from '../../types/genres';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  // genresList: GenresList | null = null;
  // constructor(private store: Store, private MediaManagementService: MediaManagementService) {}
  // ngOnInit(): void {
  //   this.store.select(selectGenres).subscribe((res) => {
  //     if (res) {
  //       this.genresList = res;
  //     }
  //   });
  // }
}
