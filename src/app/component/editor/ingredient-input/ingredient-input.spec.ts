import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientInput } from './ingredient-input';

describe('IngredientInput', () => {
  let component: IngredientInput;
  let fixture: ComponentFixture<IngredientInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientInput],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
