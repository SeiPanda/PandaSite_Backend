import { IsNotEmpty, IsOptional } from 'class-validator';

export class TimeUnitDTO {
  @IsNotEmpty()
  id: string;

  @IsOptional()
  name?: string;
}
