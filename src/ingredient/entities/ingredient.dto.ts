import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { AmountUnitDTO } from 'src/amount-unit/entities/amountUnit.dto';

export class IngredientDTO {
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  id?: number;

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
