import { Controller } from '@nestjs/common';
import { AmountUnitService } from './amount-unit.service';

@Controller('amount-unit')
export class AmountUnitController {
  constructor(private readonly amountUnitService: AmountUnitService) {}
}
