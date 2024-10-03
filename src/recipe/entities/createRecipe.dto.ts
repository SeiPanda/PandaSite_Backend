import { Type } from 'class-transformer';
import {
  IsArray,
  IsBase64,
  IsNotEmpty,
  IsNumber,
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
  @IsNumber()
  score: number;

  @IsNotEmpty()
  @IsNumber()
  time: number;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => TimeUnitDTO)
  timeUnit: TimeUnitDTO;

  @IsOptional()
  image?: string;

  @IsNotEmpty()
  @IsNumber()
  calories: number;

  @IsNotEmpty()
  @IsNumber()
  carbs: number;

  @IsNotEmpty()
  @IsNumber()
  fiber: number;

  @IsNotEmpty()
  @IsNumber()
  protein: number;

  @IsNotEmpty()
  @IsNumber()
  fat: number;

  @IsNotEmpty()
  @IsNumber()
  sugar: number;

  @IsNotEmpty()
  @IsNumber()
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
