import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishDiscount } from './dish-discount';

describe('DishDiscount', () => {
  let component: DishDiscount;
  let fixture: ComponentFixture<DishDiscount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishDiscount],
    }).compileComponents();

    fixture = TestBed.createComponent(DishDiscount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
