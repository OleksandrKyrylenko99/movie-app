import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieHeaderSelectedListComponent } from './movie-header-select-list.component';

describe('AddedMovieComponent', () => {
  let component: MovieHeaderSelectedListComponent;
  let fixture: ComponentFixture<MovieHeaderSelectedListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieHeaderSelectedListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieHeaderSelectedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
