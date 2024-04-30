import { Module } from '@nestjs/common';
import { AmountUnitService } from './amount-unit.service';
import { AmountUnitController } from './amount-unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmountUnit } from './entities/amountUnit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AmountUnit])],
  controllers: [AmountUnitController],
  providers: [AmountUnitService],
  exports: [AmountUnitService],
})
export class AmountUnitModule {}
