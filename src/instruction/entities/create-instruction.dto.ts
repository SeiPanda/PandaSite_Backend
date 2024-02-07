import { CreateIngredientDTO } from 'src/ingredient/entities/create-ingredient.dto';
import { CreateUtilDTO } from 'src/util/entities/create-util.dto';

export class CreateInstructionDTO {
  step: number;
  content: string;
  title?: string;
  utils?: CreateUtilDTO[];
  ingredients?: CreateIngredientDTO[];
}
