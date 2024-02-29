import { Injectable } from '@nestjs/common';
import { TimeUnit } from './entities/timeUnit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimeUnitService {
  constructor(private readonly timeUnitRepository: Repository<TimeUnit>) {}

  async create(id: string, name: string): Promise<TimeUnit> {
    await this.timeUnitRepository.upsert([{ id, name }], ['id']);
  }
}
