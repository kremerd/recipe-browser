import { Injectable } from '@angular/core';
import { Ingredient } from '../../../service';

@Injectable({
  providedIn: 'root',
})
export class IngredientParser {
  private readonly units = [
    'l',
    'ml',
    'mg',
    'g',
    'kg',
    'Stk',
    'Stk.',
    'Stück',
    'Stücke',
    'Beutel',
    'Pkg',
    'Pkg.',
    'Packung',
    'Packungen',
    'Päckchen',
    'Prise',
    'Prisen',
    'Msp',
    'Msp.',
    'Messerspitze',
    'Messerspitzen',
    'EL',
    'Esslöffel',
    'TL',
    'Teelöffel',
  ];

  private readonly amountRegex = new RegExp(
    /(?<amount>\d+([.,]\d+)?)?(?<remainder>.*)/,
  );

  parse(input: string): Ingredient {
    const amountMatch = input.trim().match(this.amountRegex);
    if (!amountMatch?.groups) {
      throw new Error(
        'Text input did not match amountRegex. This should not happen!',
      );
    }

    const amount = amountMatch.groups['amount']
      ? parseFloat(amountMatch.groups['amount'].replace(',', '.'))
      : undefined;
    const remainder = amountMatch.groups['remainder'].trim();

    if (amount === undefined) {
      return { name: remainder };
    }

    const remainderSegments = remainder.split(' ');
    if (!this.units.includes(remainderSegments[0])) {
      return { amount, name: remainder };
    }

    return {
      amount,
      unit: remainderSegments[0],
      name: remainderSegments.slice(1).join(' '),
    };
  }
}
