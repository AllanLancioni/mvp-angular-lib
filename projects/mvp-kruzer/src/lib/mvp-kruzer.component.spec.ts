import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MvpKruzerComponent } from './mvp-kruzer.component';

describe('MvpKruzerComponent', () => {
  let component: MvpKruzerComponent;
  let fixture: ComponentFixture<MvpKruzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MvpKruzerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MvpKruzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
