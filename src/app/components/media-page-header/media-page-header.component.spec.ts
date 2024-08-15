import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaPageHeaderComponent } from './media-page-header.component';

describe('MediaPageHeaderComponent', () => {
  let component: MediaPageHeaderComponent;
  let fixture: ComponentFixture<MediaPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaPageHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediaPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
