import { Controller } from '@nestjs/common';
import { TimeUnitService } from './time-unit.service';

@Controller('time-unit')
export class TimeUnitController {
  constructor(private readonly timeUnitService: TimeUnitService) {}
}
