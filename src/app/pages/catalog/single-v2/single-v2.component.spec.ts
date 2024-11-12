import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleV2Component } from './single-v2.component';

describe('SingleV2Component', () => {
  let component: SingleV2Component;
  let fixture: ComponentFixture<SingleV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
