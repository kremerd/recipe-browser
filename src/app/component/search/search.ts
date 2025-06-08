import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { RecipeRegistry } from '../../service';

@Component({
  selector: 'rec-search',
  imports: [RouterLinkWithHref, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class SearchComponent {
  private readonly recipeRegistry = inject(RecipeRegistry);

  readonly search = signal<string>('');
  readonly recipes = this.recipeRegistry.getRecipes(this.search);
}
