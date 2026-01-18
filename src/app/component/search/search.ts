import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
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
    FormField,
    RouterLinkWithHref,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private readonly recipeRegistry = inject(RecipeRegistry);

  readonly search = form<string>(signal(''));
  readonly recipes = this.recipeRegistry.getRecipes(this.search().value);
}
