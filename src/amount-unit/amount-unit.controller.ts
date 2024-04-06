import { Controller, Get } from '@nestjs/common';
import { AmountUnitService } from './amount-unit.service';
import { AmountUnitDTO } from './entities/amountUnit.dto';
import { mapAmountUnitToDTO } from 'src/mappers/amountUnit.mapper';

@Controller('amount-unit')
export class AmountUnitController {
  constructor(private readonly amountUnitService: AmountUnitService) {}

  @Get()
  async findAll(): Promise<AmountUnitDTO[]> {
    const allUnits = await this.amountUnitService.getAmountUnits();
    const unitsToReturn: AmountUnitDTO[] = [];
    for (const unit of allUnits) {
      unitsToReturn.push(mapAmountUnitToDTO(unit));
    }
    return unitsToReturn;
  }
}
