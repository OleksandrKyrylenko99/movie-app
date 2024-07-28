import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedMovieListComponent } from './selected-movie-list.component';

describe('SelectedMovieListComponent', () => {
  let component: SelectedMovieListComponent;
  let fixture: ComponentFixture<SelectedMovieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedMovieListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedMovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
