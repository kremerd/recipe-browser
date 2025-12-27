import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Field, form } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { Ingredient, Recipe, RecipeRegistry } from '../../service';
import { IngredientInputComponent } from './ingredient-input/ingredient-input';
import { TagInputComponent } from './tag-input/tag-input';

@Component({
  selector: 'rec-editor',
  imports: [
    Field,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterLinkWithHref,
    IngredientInputComponent,
    TagInputComponent,
  ],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  private readonly router = inject(Router);
  private readonly recipeRegistry = inject(RecipeRegistry);

  readonly title: string = inject(ActivatedRoute).snapshot.data['title'];
  private readonly recipe: Recipe =
    inject(ActivatedRoute).snapshot.data['recipe'];
  readonly recipeForm = form<Recipe>(signal(this.recipe));

  addIngredient(): void {
    this.recipeForm
      .ingredients()
      .value.update((ingredients) => [
        ...ingredients,
        { amount: 0, unit: '', name: '' },
      ]);
  }

  removeIngredient(ingredient: Ingredient): void {
    this.recipeForm
      .ingredients()
      .value.update((ingredients) =>
        ingredients.filter((ing) => ing !== ingredient),
      );
  }

  saveRecipe(): void {
    this.recipeRegistry.saveRecipe(this.recipeForm().value());
    this.router.navigate([`/recipe/${this.recipeForm.id().value()}`]);
  }
}
