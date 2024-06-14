import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-search-movie',
  standalone: true,
  imports: [],
  templateUrl: './search-movie.component.html',
  styleUrl: './search-movie.component.scss'
})
export class SearchMovieComponent implements OnInit{
  constructor(){} 
    ngOnInit(): void {
  }
}
