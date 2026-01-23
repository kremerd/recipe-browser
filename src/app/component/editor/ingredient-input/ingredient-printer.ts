import { Injectable } from '@angular/core';
import { Ingredient } from '../../../service';

@Injectable({
  providedIn: 'root',
})
export class IngredientPrinter {
  private readonly cuddlingUnits = ['l', 'ml', 'mg', 'g', 'kg'];

  print(ingredient: Ingredient): string {
    if (
      ingredient.amount !== undefined &&
      this.isCuddlingUnit(ingredient.unit)
    ) {
      return `${this.formatAmount(ingredient.amount)}${ingredient.unit} ${ingredient.name}`;
    }

    return [
      this.formatAmount(ingredient.amount),
      ingredient.unit,
      ingredient.name,
    ]
      .filter((s) => s !== undefined)
      .join(' ');
  }

  private formatAmount(amount: number | undefined): string | undefined {
    if (amount === undefined) {
      return undefined;
    }

    return amount.toString(10)?.replace('.', ',');
  }

  private isCuddlingUnit(unit: string | undefined): unit is string {
    return (this.cuddlingUnits as (string | undefined)[]).includes(unit);
  }
}
