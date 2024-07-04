import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedMoviePageComponent } from './selected-movie-page.component';

describe('SelectedMoviePageComponent', () => {
  let component: SelectedMoviePageComponent;
  let fixture: ComponentFixture<SelectedMoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedMoviePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectedMoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
