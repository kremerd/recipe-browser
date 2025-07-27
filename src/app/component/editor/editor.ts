import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { Recipe, RecipeRegistry } from '../../service';

@Component({
  selector: 'rec-editor',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLinkWithHref,
  ],
  templateUrl: './editor.html',
  styleUrl: './editor.scss',
})
export class EditorComponent {
  private readonly router = inject(Router);
  private readonly recipeRegistry = inject(RecipeRegistry);

  readonly title: string = inject(ActivatedRoute).snapshot.data['title'];
  readonly recipeForm: FormGroup<{
    id: FormControl<string>;
    title: FormControl<string>;
    description: FormControl<string>;
    tags: FormArray<FormControl<string>>;
    ingredients: FormArray<
      FormGroup<{
        amount: FormControl<number>;
        unit: FormControl<string>;
        name: FormControl<string>;
      }>
    >;
  }>;

  constructor() {
    const recipe: Recipe = inject(ActivatedRoute).snapshot.data['recipe'];
    this.recipeForm = new FormGroup({
      id: new FormControl(recipe.id, { nonNullable: true }),
      title: new FormControl(recipe.title, { nonNullable: true }),
      description: new FormControl(recipe.description, { nonNullable: true }),
      tags: new FormArray(
        recipe.tags.map((tag) => new FormControl(tag, { nonNullable: true })),
      ),
      ingredients: new FormArray(
        recipe.ingredients.map(
          (ingredient) =>
            new FormGroup({
              amount: new FormControl(ingredient.amount, { nonNullable: true }),
              unit: new FormControl(ingredient.unit, { nonNullable: true }),
              name: new FormControl(ingredient.name, { nonNullable: true }),
            }),
        ),
      ),
    });
  }

  addTag(): void {
    this.recipeForm.controls.tags.push(
      new FormControl('', { nonNullable: true }),
    );
  }

  removeTag(index: number): void {
    this.recipeForm.controls.tags.removeAt(index);
  }

  addIngredient(): void {
    this.recipeForm.controls.ingredients.push(
      new FormGroup({
        amount: new FormControl(0, { nonNullable: true }),
        unit: new FormControl('', { nonNullable: true }),
        name: new FormControl('', { nonNullable: true }),
      }),
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
