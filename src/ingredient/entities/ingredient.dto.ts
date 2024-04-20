import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { AmountUnitDTO } from 'src/amount-unit/entities/amountUnit.dto';

export class IngredientDTO {
  @IsNotEmpty()
  singleName: string;

  @IsNotEmpty()
  pluralName: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => AmountUnitDTO)
  unit: AmountUnitDTO;
}
