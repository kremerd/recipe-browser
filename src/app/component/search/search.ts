import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { RouterLinkWithHref } from '@angular/router';
import { RecipeRegistry } from '../../service';

@Component({
  selector: 'rec-search',
  imports: [
    RouterLinkWithHref,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class SearchComponent {
  private readonly recipeRegistry = inject(RecipeRegistry);

  readonly search = signal<string>('');
  readonly recipes = this.recipeRegistry.getRecipes(this.search);
}
