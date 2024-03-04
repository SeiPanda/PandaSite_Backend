export class GetRecipeShortDTO {
  title: string;
  score?: number;
  time?: number;
  imagePath?: string;
  calories?: number;
  portionSize?: number;
  difficulty?: string;
  carbs?: number;
  fiber?: number;
  fat?: number;
  sugar?: number;
  protein?: number;
  instructions: CreateInstructionDTO[];
  categories?: CreateCategoryDTO[];
  ingredients: CreateIngredientDTO[];
}
