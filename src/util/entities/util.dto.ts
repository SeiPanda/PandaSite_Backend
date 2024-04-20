import { IsNotEmpty } from 'class-validator';

export class UtilDTO {
  @IsNotEmpty()
  name: string;
}
