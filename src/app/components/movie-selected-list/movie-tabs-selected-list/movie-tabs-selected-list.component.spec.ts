import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieTabsSelectedListComponent } from './movie-tabs-selected-list.component';

describe('MovieTabsSelectedListComponent', () => {
  let component: MovieTabsSelectedListComponent;
  let fixture: ComponentFixture<MovieTabsSelectedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieTabsSelectedListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieTabsSelectedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
