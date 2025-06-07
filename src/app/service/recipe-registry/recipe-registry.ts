import { computed, Injectable, signal, Signal } from '@angular/core';
import type { Recipe } from '../model';

@Injectable({
  providedIn: 'root',
})
export class RecipeRegistry {
  private readonly recipes = signal<Recipe[]>([]);

  public getRecipe(id: string): Signal<Recipe | undefined> {
    return computed(() => this.recipes().find((r) => r.id === id));
  }
}
