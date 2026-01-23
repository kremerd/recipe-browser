import { TestBed } from '@angular/core/testing';
import { Ingredient } from '../../../service';
import { IngredientParser } from './ingredient-parser';

describe('IngredientParser', () => {
  let service: IngredientParser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientParser);
  });

  it('should parse space separated ingredients correctly', () => {
    const expected: Ingredient = {
      amount: 3,
      unit: 'ml',
      name: 'Milch',
    };
    expect(service.parse('3 ml Milch')).toEqual(expected);
  });

  it('should parse space separated ingredients with comma-separated decimal digits correctly', () => {
    const expected: Ingredient = {
      amount: 3.05,
      unit: 'ml',
      name: 'Milch',
    };
    expect(service.parse('3,05 ml Milch')).toEqual(expected);
  });

  it('should parse space separated ingredients with dot-separated decimal digits correctly', () => {
    const expected: Ingredient = {
      amount: 3.05,
      unit: 'ml',
      name: 'Milch',
    };
    expect(service.parse('3.05 ml Milch')).toEqual(expected);
  });

  it('should parse space separated ingredients with multi-noun name correctly', () => {
    const expected: Ingredient = {
      amount: 3,
      unit: 'kg',
      name: 'große Zucchini',
    };
    expect(service.parse('3 kg große Zucchini')).toEqual(expected);
  });

  it('should parse ingredients correctly when amount and unit are combined', () => {
    const expected: Ingredient = {
      amount: 3,
      unit: 'ml',
      name: 'Milch',
    };
    expect(service.parse('3ml Milch')).toEqual(expected);
  });

  it('should parse ingredients correctly when amount and unit are set but name is missing', () => {
    const expected: Ingredient = {
      amount: 3,
      unit: 'ml',
      name: '',
    };
    expect(service.parse('3 ml')).toEqual(expected);
  });

  it('should parse ingredients correctly when there is no unit', () => {
    const expected: Ingredient = {
      amount: 3,
      name: 'Äpfel',
    };
    expect(service.parse('3 Äpfel')).toEqual(expected);
  });

  it('should parse multi-noun ingredients correctly when there is no unit', () => {
    const expected: Ingredient = {
      amount: 3,
      name: 'große Äpfel',
    };
    expect(service.parse('3 große Äpfel')).toEqual(expected);
  });

  it('should parse ingredients correctly when there is neither quantity nor unit', () => {
    const expected: Ingredient = {
      name: 'Zimt',
    };
    expect(service.parse('Zimt')).toEqual(expected);
  });
});
