import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  template: `<div class="lds-facebook">
    <div></div>
    <div></div>
    <div></div>
  </div>`,
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {}
