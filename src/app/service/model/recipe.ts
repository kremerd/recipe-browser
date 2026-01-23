export interface Recipe {
  id: string;
  tags: string[];
  title: string;
  description: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  amount?: number;
  unit?: string;
  name: string;
}
