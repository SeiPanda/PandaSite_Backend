import { IsNotEmpty } from 'class-validator';

export class TimeUnitDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;
}
