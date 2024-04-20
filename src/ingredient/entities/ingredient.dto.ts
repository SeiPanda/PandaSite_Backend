import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, ValidateNested } from 'class-validator';
import { AmountUnitDTO } from 'src/amount-unit/entities/amountUnit.dto';

export class IngredientDTO {
  @IsNotEmpty()
  singleName: string;

  @IsNotEmpty()
  pluralName: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => AmountUnitDTO)
  unit: AmountUnitDTO;
}
