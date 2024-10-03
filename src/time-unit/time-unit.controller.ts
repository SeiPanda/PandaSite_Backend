import { Controller, Get } from '@nestjs/common';
import { TimeUnitService } from './time-unit.service';
import { TimeUnitDTO } from './entities/timeUnit.dto';
import { mapTimeUnitToDTO } from 'src/mappers/timeUnit.mapper';

@Controller('time-unit')
export class TimeUnitController {
  constructor(private readonly timeUnitService: TimeUnitService) {}

  @Get()
  async findAll(): Promise<TimeUnitDTO[]> {
    const allUnits = await this.timeUnitService.getTimeUnits();
    const unitsToReturn: TimeUnitDTO[] = [];
    for (const unit of allUnits) {
      unitsToReturn.push(mapTimeUnitToDTO(unit));
    }
    return unitsToReturn;
  }
}
