import { Type } from 'class-transformer';
import {
  IsArray,
  IsBase64,
  IsNotEmpty,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CategoryDTO } from 'src/category/entities/category.dto';
import { InstructionDTO } from 'src/instruction/entities/instruction.dto';
import { TimeUnitDTO } from 'src/time-unit/entities/timeUnit.dto';

export class CreateRecipeDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  score: number;

  @IsNotEmpty()
  time: number;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => TimeUnitDTO)
  timeUnit: TimeUnitDTO;

  @IsBase64()
  @IsOptional()
  image?: string;

  @IsNotEmpty()
  calories: number;

  @IsNotEmpty()
  carbs: number;

  @IsNotEmpty()
  fiber: number;

  @IsNotEmpty()
  protein: number;

  @IsNotEmpty()
  fat: number;

  @IsNotEmpty()
  sugar: number;

  @IsNotEmpty()
  portionSize: number;

  @IsNotEmpty()
  difficulty: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CategoryDTO)
  categories: CategoryDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InstructionDTO)
  instructions: InstructionDTO[];
}
