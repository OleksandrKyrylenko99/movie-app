import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieOrSeriesDetailsComponent } from './movie-or-series-details.component';

describe('MovieOrSeriesDetailsComponent', () => {
  let component: MovieOrSeriesDetailsComponent;
  let fixture: ComponentFixture<MovieOrSeriesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieOrSeriesDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieOrSeriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
