import { CreateCategoryDTO } from 'src/category/entities/create-category.dto';
import { CreateDifficultyDTO } from 'src/difficulty/entities/create-difficulty.dto';
import { CreateIngredientDTO } from 'src/ingredient/entities/create-ingredient.dto';
import { CreateInstructionDTO } from 'src/instruction/entities/create-instruction.dto';
import { CreateTimeUnitDTO } from 'src/time-unit/entities/create-timeUnit.dto';

export class CreateRecipeDTO {
  title: string;
  score?: number;
  time?: number;
  timeUnit?: CreateTimeUnitDTO;
  imagePath?: string;
  calories?: number;
  portionSize?: number;
  difficulty?: CreateDifficultyDTO;
  carbs?: number;
  fiber?: number;
  fat?: number;
  sugar?: number;
  protein?: number;
  instructions: CreateInstructionDTO[];
  categories?: CreateCategoryDTO[];
  ingredients: CreateIngredientDTO[];
}
