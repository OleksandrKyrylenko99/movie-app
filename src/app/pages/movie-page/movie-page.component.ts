import { Component, OnInit } from '@angular/core';
import { MediaPageComponent } from '../../components/media-page/media-page.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-movie-page',
  standalone: true,
  imports: [MediaPageComponent, AsyncPipe],
  templateUrl: './movie-page.component.html',
  styleUrl: './movie-page.component.scss',
})
export class MoviePageComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
