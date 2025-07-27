import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';
import { RecipeRegistry } from '../../service';

@Component({
  selector: 'rec-recipe',
  imports: [RouterLinkWithHref, MatButtonModule],
  templateUrl: './recipe.html',
  styleUrl: './recipe.scss',
})
export class RecipeComponent {
  private readonly recipeRegistry = inject(RecipeRegistry);
  private readonly route = inject(ActivatedRoute);

  private readonly paramMap = toSignal(this.route.paramMap);
  private readonly id = computed(() => this.paramMap()?.get('id'));
  readonly recipe = this.recipeRegistry.getRecipe(this.id);
}
