export interface Recipe {
  id: string;
  tags: string[];
  ingredients: Ingredient[];
  description: string;
}

export interface Ingredient {
  amount: number;
  unit: string;
  name: string;
}
