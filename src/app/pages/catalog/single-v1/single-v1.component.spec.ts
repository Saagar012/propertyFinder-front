import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleV1Component } from './single-v1.component';

describe('SingleV1Component', () => {
  let component: SingleV1Component;
  let fixture: ComponentFixture<SingleV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleV1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
