import { Category } from 'src/category/entities/category.entity';
import { Difficulty } from 'src/difficulty/entities/difficulty.entity';
import { IngredientDTO } from 'src/ingredient/entities/ingredient.dto';
import { Instruction } from 'src/instruction/entities/instruction.entity';
import { TimeUnit } from 'src/time-unit/entities/timeUnit.entity';

export class RecipeDTO {
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
  ingredients: IngredientDTO[];
}
