import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AmountUnit } from 'src/amount-unit/entities/amountUnit.entity';
import { Repository } from 'typeorm';
import { TimeUnit } from './entities/timeUnit.entity';

@Injectable()
export class TimeUnitService {
    constructor(
        @InjectRepository(TimeUnit)
        private timeRepository: Repository<TimeUnit>,
      ) {}
    
      getTimeUnits(): Promise<TimeUnit[]> {
        return this.timeRepository.find();
      }

}
