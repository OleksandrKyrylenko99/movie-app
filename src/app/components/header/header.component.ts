import { Component, Input } from '@angular/core';
import { MovieSelectListComponent } from '../movie-select-list/movie-select-list.component';
import { MovieObjList } from '../../types/movie-object-list.type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MovieSelectListComponent,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() movieObjList : MovieObjList = {
    favouriteList : [],
    watchList : []
  }
}
