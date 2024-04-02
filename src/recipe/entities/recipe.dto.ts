import { CategoryDTO } from 'src/category/entities/category.dto';
import { IngredientDTO } from 'src/ingredient/entities/ingredient.dto';
import { InstructionDTO } from 'src/instruction/entities/instruction.dto';
import { TimeUnitDTO } from 'src/time-unit/entities/timeUnit.dto';

export class RecipeDTO {
  id: number;
  title: string;
  score: number;
  time: number;
  timeUnit: TimeUnitDTO;
  image: string;
  calories: number;
  carbs: number;
  fiber: number;
  description: string;
  protein: number;
  fat: number;
  sugar: number;
  portionSize: number;
  difficulty: string;
  categories: CategoryDTO[];
  instructions: InstructionDTO[];
  ingredients: IngredientDTO[];
}

export class RecipeThinDTO {
    id:number;
    title: string;
    score?: number;
    portionSize: number;
    difficulty?: string;
    description: string;
    time: number;
    timeUnit: TimeUnitDTO;
    image?: string;
    calories?: number;
    protein?: number;
    categories: CategoryDTO[];
  
}