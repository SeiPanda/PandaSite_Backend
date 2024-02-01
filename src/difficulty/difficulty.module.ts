import { Module } from '@nestjs/common';
import { DifficultyService } from './difficulty.service';
import { DifficultyController } from './difficulty.controller';
import { Difficulty } from './entities/difficulty.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Difficulty])],
  controllers: [DifficultyController],
  providers: [DifficultyService],
})
export class DifficultyModule {}
