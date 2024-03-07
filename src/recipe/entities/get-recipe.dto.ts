import { Category } from "src/category/entities/category.entity";
import { Difficulty } from "src/difficulty/entities/difficulty.entity";
import { Instruction } from "src/instruction/entities/instruction.entity";
import { GetRecipeIngredientDTO } from "src/recipe_ingredient/entities/get-recipeIngredient.dto";
import { TimeUnit } from "src/time-unit/entities/timeUnit.entity";

export class GetRecipeDTO {
  id: number;
  title: string;
  score: number;
  time: number;
  timeUnit: TimeUnit;
  imagePath: string;
  calories: number;
  carbs: number;
  fiber: number;
  protein: number;
  fat: number;
  sugar: number;
  portionSize: number;
  difficulty: Difficulty;
  categories: Category[];
  instructions: Instruction[];
  ingredients: GetRecipeIngredientDTO[];
}