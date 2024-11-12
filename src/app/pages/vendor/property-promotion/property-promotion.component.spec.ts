import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyPromotionComponent } from './property-promotion.component';

describe('PropertyPromotionComponent', () => {
  let component: PropertyPromotionComponent;
  let fixture: ComponentFixture<PropertyPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyPromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
