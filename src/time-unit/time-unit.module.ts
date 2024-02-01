import { Module } from '@nestjs/common';
import { TimeUnitService } from './time-unit.service';
import { TimeUnitController } from './time-unit.controller';
import { TimeUnit } from './entities/timeUnit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TimeUnit])],
  controllers: [TimeUnitController],
  providers: [TimeUnitService],
})
export class TimeUnitModule {}
