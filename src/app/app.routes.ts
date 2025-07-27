import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { EditorComponent, RecipeComponent, SearchComponent } from './component';
import { Recipe, RecipeRegistry } from './service';

export const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
  {
    path: 'new',
    component: EditorComponent,
    resolve: {
      recipe: (): Recipe | undefined => inject(RecipeRegistry).getEmptyRecipe(),
      title: () => 'Neues Rezept',
    },
  },
  {
    path: 'recipe/:id',
    component: RecipeComponent,
  },
  {
    path: 'recipe/:id/edit',
    component: EditorComponent,
    resolve: {
      recipe: (route: ActivatedRouteSnapshot): Recipe | undefined =>
        inject(RecipeRegistry).getRecipe(route.paramMap.get('id')),
      title: () => 'Rezept bearbeiten',
    },
  },
];
