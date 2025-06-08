import { computed, Injectable, signal, Signal } from '@angular/core';
import type { Recipe } from '../model';

@Injectable({
  providedIn: 'root',
})
export class RecipeRegistry {
  private readonly recipes = signal<Recipe[]>([
    {
      id: 'toast',
      tags: ['Brot', 'Toast'],
      title: 'Toastbrot',
      description: 'Ein Rezept für Toastbrot',
      ingredients: [
        {
          amount: 1,
          unit: 'kg',
          name: 'Mehl',
        },
        {
          amount: 200,
          unit: 'g',
          name: 'Zucker',
        },
        {
          amount: 1,
          unit: 'Prise',
          name: 'Salz',
        },
      ],
    },
  ]);

  public getRecipes(search?: Signal<string>): Signal<Recipe[]> {
    if (!search) {
      return this.recipes.asReadonly();
    }

    return computed(() => {
      const normalizedSearch = search().toLowerCase();
      return this.recipes().filter((rec) =>
        this.getNormalizedTags(rec).some((tag) =>
          tag.includes(normalizedSearch),
        ),
      );
    });
  }

  private getNormalizedTags(recipe: Recipe): string[] {
    return [recipe.id, recipe.title, ...recipe.tags].map((tag) =>
      tag.toLowerCase(),
    );
  }

  public getRecipe(
    id: Signal<string | null | undefined>,
  ): Signal<Recipe | undefined> {
    return computed(() => this.recipes().find((r) => r.id === id()));
  }
}
