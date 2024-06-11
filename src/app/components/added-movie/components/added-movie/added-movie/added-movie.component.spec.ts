import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedMovieComponent } from './added-movie.component';

describe('AddedMovieComponent', () => {
  let component: AddedMovieComponent;
  let fixture: ComponentFixture<AddedMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddedMovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddedMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
