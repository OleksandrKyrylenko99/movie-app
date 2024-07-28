import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteMoviePageComponent } from './favourite-movie-page.component';

describe('FavouriteMoviePageComponent', () => {
  let component: FavouriteMoviePageComponent;
  let fixture: ComponentFixture<FavouriteMoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteMoviePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavouriteMoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
