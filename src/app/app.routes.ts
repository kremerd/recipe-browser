import { Routes } from '@angular/router';
import { Editor, Recipe, Search } from './component';

export const routes: Routes = [
  {
    path: '',
    component: Search,
  },
  {
    path: 'new',
    component: Editor,
  },
  {
    path: 'recipe/:id',
    component: Recipe,
  },
  {
    path: 'recipe/:id/edit',
    component: Editor,
  },
];
