import { TestBed } from '@angular/core/testing';
import { Ingredient } from '../../../service';
import { IngredientPrinter } from './ingredient-printer';

describe('IngredientPrinter', () => {
  let service: IngredientPrinter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientPrinter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should print ingredients with amount and unit correctly', () => {
    const ingredient: Ingredient = {
      amount: 3,
      unit: 'Packungen',
      name: 'Sahne',
    };
    expect(service.print(ingredient)).toEqual('3 Packungen Sahne');
  });

  it('should print ingredients with decimal amount and unit correctly', () => {
    const ingredient: Ingredient = {
      amount: 3.5,
      unit: 'Packungen',
      name: 'Sahne',
    };
    expect(service.print(ingredient)).toEqual('3,5 Packungen Sahne');
  });

  it('should print ingredients with amount and without unit correctly', () => {
    const ingredient: Ingredient = {
      amount: 3,
      name: 'Äpfel',
    };
    expect(service.print(ingredient)).toEqual('3 Äpfel');
  });

  it('should print ingredients with decimal amount and without unit correctly', () => {
    const ingredient: Ingredient = {
      amount: 3.5,
      name: 'Äpfel',
    };
    expect(service.print(ingredient)).toEqual('3,5 Äpfel');
  });

  it('should print ingredients without amount and unit correctly', () => {
    const ingredient: Ingredient = {
      name: 'Zimt',
    };
    expect(service.print(ingredient)).toEqual('Zimt');
  });
});
