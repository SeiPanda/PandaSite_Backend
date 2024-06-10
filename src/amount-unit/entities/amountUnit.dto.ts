import { IsNotEmpty } from 'class-validator';

export class AmountUnitDTO {
  @IsNotEmpty()
  id: string;

  name?: string;
}
