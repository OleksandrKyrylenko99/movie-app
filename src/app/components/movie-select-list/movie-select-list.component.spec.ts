import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSelectListComponent } from './movie-select-list.component';

describe('AddedMovieComponent', () => {
  let component: MovieSelectListComponent;
  let fixture: ComponentFixture<MovieSelectListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSelectListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieSelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
