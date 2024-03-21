import { CategoryDTO } from 'src/category/entities/category.dto';
import { Category } from 'src/category/entities/category.entity';
import { DifficultyDTO } from 'src/difficulty/entities/difficulty.dto';
import { Difficulty } from 'src/difficulty/entities/difficulty.entity';
import { IngredientDTO } from 'src/ingredient/entities/ingredient.dto';
import { InstructionDTO } from 'src/instruction/entities/instruction.dto';
import { Instruction } from 'src/instruction/entities/instruction.entity';
import { TimeUnitDTO } from 'src/time-unit/entities/timeUnit.dto';
import { TimeUnit } from 'src/time-unit/entities/timeUnit.entity';

export class RecipeDTO {
  title: string;
  score: number;
  time: number;
  timeUnit: TimeUnitDTO;
  imagePath: string;
  calories: number;
  carbs: number;
  fiber: number;
  protein: number;
  fat: number;
  sugar: number;
  portionSize: number;
  difficulty: string;
  categories: CategoryDTO[];
  instructions: InstructionDTO[];
  ingredients: IngredientDTO[];
}
