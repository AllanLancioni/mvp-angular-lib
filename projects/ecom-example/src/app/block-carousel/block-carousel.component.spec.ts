import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockCarouselComponent } from './block-carousel.component';

describe('BlockCarouselComponent', () => {
  let component: BlockCarouselComponent;
  let fixture: ComponentFixture<BlockCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockCarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
