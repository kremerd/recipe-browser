import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { Ingredient, Recipe, RecipeRegistry } from '../../service';
import { IngredientInput } from './ingredient-input/ingredient-input';
import { TagInput } from './tag-input/tag-input';

@Component({
  selector: 'rec-editor',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    RouterLinkWithHref,
    IngredientInput,
    TagInput,
  ],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorComponent {
  private readonly router = inject(Router);
  private readonly recipeRegistry = inject(RecipeRegistry);

  readonly title: string = inject(ActivatedRoute).snapshot.data['title'];
  readonly recipeForm: FormGroup<{
    id: FormControl<string>;
    title: FormControl<string>;
    description: FormControl<string>;
    tags: FormControl<string[]>;
    ingredients: FormArray<FormControl<Ingredient>>;
  }>;

  constructor() {
    const recipe: Recipe = inject(ActivatedRoute).snapshot.data['recipe'];
    this.recipeForm = new FormGroup({
      id: new FormControl(recipe.id, { nonNullable: true }),
      title: new FormControl(recipe.title, { nonNullable: true }),
      description: new FormControl(recipe.description, { nonNullable: true }),
      tags: new FormControl(recipe.tags, { nonNullable: true }),
      ingredients: new FormArray(
        recipe.ingredients.map(
          (ingredient) => new FormControl(ingredient, { nonNullable: true }),
        ),
      ),
    });
  }

  addIngredient(): void {
    this.recipeForm.controls.ingredients.push(
      new FormControl(
        {
          amount: 0,
          unit: '',
          name: '',
        },
        { nonNullable: true },
      ),
    );
  }

  removeIngredient(index: number): void {
    console.log('removing at', index);
    this.recipeForm.controls.ingredients.removeAt(index);
  }

  saveRecipe(): void {
    this.recipeRegistry.saveRecipe(this.recipeForm.getRawValue());
    this.router.navigate([`/recipe/${this.recipeForm.controls.id.value}`]);
  }
}
