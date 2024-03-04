import { Injectable } from '@nestjs/common';
import { TimeUnit } from './entities/timeUnit.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TimeUnitService {
  constructor(
    @InjectRepository(TimeUnit)
    private readonly timeUnitRepository: Repository<TimeUnit>,
  ) {}

  async create(
    id: string,
    name: string,
    load: boolean,
  ): Promise<TimeUnit> | undefined {
    const insertResult = await this.timeUnitRepository.upsert(
      [{ id, name }],
      ['id'],
    );
    if (load) {
      return this.findOne(insertResult.identifiers['id']);
    }
    return undefined;
  }

  findOne(id: string): Promise<TimeUnit> {
    return this.timeUnitRepository.findOneBy({ id });
  }
}
