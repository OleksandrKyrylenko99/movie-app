import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTopRatingPageComponent } from './movie-top-rating-page.component';

describe('MovieTopRatingPageComponent', () => {
  let component: MovieTopRatingPageComponent;
  let fixture: ComponentFixture<MovieTopRatingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieTopRatingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieTopRatingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
