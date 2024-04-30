import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { AmountUnitDTO } from 'src/amount-unit/entities/amountUnit.dto';
import { IngredientDTO } from 'src/ingredient/entities/ingredient.dto';
import { InstructionDTO } from 'src/instruction/entities/instruction.dto';

export class InstructionIngredientDTO {
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => InstructionDTO)
  instruction: InstructionDTO;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => IngredientDTO)
  ingredient: IngredientDTO;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => AmountUnitDTO)
  amountUnit: AmountUnitDTO;
}
