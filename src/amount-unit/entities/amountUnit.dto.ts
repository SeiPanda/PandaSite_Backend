import { IsNotEmpty } from 'class-validator';

export class AmountUnitDTO {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;
}
