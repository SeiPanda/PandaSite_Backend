import { IngredientDTO } from 'src/ingredient/entities/ingredient.dto';
import { UtilDTO } from 'src/util/entities/util.dto';

export class InstructionDTO {
  step: number;
  content: string;
  title: string;
  utils: UtilDTO[];
  ingredients: IngredientDTO[];
}
