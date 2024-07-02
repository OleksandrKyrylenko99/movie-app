import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMoviePageComponent } from './all-movie-page.component';

describe('MovieListPageComponent', () => {
  let component: AllMoviePageComponent;
  let fixture: ComponentFixture<AllMoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllMoviePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllMoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
