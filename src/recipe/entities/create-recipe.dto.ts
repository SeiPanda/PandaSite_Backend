import { CreateCategoryDTO } from 'src/category/entities/create-category.dto';
import { CreateDifficultyDTO } from 'src/difficulty/entities/create-difficulty.dto';
import { CreateTimeDTO } from 'src/general/dto/create-time.dto';
import { CreateIngredientDTO } from 'src/ingredient/entities/create-ingredient.dto';
import { CreateInstructionDTO } from 'src/instruction/entities/create-instruction.dto';

export class CreateRecipeDTO {
  title: string;
  score?: number;
  time?: CreateTimeDTO;
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
