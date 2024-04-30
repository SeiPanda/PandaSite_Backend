import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { IngredientDTO } from 'src/ingredient/entities/ingredient.dto';
import { UtilDTO } from 'src/util/entities/util.dto';

export class InstructionDTO {
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsNumber()
  step: number;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  title: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UtilDTO)
  utils: UtilDTO[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => IngredientDTO)
  ingredients: IngredientDTO[];
}
