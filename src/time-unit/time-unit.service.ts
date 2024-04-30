import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { TimeUnit } from './entities/timeUnit.entity';
import { TimeUnitDTO } from './entities/timeUnit.dto';

@Injectable()
export class TimeUnitService {
  constructor(
    @InjectRepository(TimeUnit)
    private timeRepository: Repository<TimeUnit>,
  ) {}

  getTimeUnits(): Promise<TimeUnit[]> {
    return this.timeRepository.find();
  }

  async findOrCreate(timeUnitDTO: TimeUnitDTO): Promise<TimeUnit> {
    let timeUnit = await this.timeRepository.findOne({
      where: {
        id: ILike(`${timeUnitDTO.id}`),
        name: ILike(`${timeUnitDTO.name}`),
      },
    });

    if (!timeUnit) {
      timeUnit = this.timeRepository.create({
        id: timeUnitDTO.id,
        name: timeUnitDTO.name,
      });
      this.timeRepository.save(timeUnit);
    }

    return timeUnit;
  }
}
