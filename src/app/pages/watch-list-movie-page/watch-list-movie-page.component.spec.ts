import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchListMoviePageComponent } from './watch-list-movie-page.component';

describe('WatchListMoviePageComponent', () => {
  let component: WatchListMoviePageComponent;
  let fixture: ComponentFixture<WatchListMoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchListMoviePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WatchListMoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
