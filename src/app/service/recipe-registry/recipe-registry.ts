import { computed, Injectable, isSignal, signal, Signal } from '@angular/core';
import type { Recipe } from '../model';

@Injectable({
  providedIn: 'root',
})
export class RecipeRegistry {
  private readonly recipes = signal<Recipe[]>([
    {
      id: '7b698900-fd56-4277-b294-a6de92e5c288',
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

  getRecipes(search?: Signal<string>): Signal<Recipe[]> {
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
    return [recipe.title, ...recipe.tags].map((tag) => tag.toLowerCase());
  }

  getEmptyRecipe(): Recipe {
    return {
      id: crypto.randomUUID(),
      tags: [],
      title: '',
      description: '',
      ingredients: [],
    };
  }

  getRecipe(id: string | null | undefined): Recipe | undefined;
  getRecipe(id: Signal<string | null | undefined>): Signal<Recipe | undefined>;
  getRecipe(
    id: Signal<string | null | undefined> | string | null | undefined,
  ): Recipe | undefined | Signal<Recipe | undefined> {
    if (isSignal(id)) {
      return computed(() => this.recipes().find((r) => r.id === id()));
    } else {
      return this.recipes().find((r) => r.id === id);
    }
  }

  saveRecipe(recipe: Recipe): void {
    const recipes = this.recipes();
    const index = recipes.findIndex((r) => r.id === recipe.id);
    this.recipes.set([
      ...recipes.slice(0, index),
      recipe,
      ...recipes.slice(index + 1),
    ]);
  }
}
