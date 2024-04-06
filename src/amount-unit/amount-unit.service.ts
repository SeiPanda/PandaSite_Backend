import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AmountUnit } from './entities/amountUnit.entity';

@Injectable()
export class AmountUnitService {
    constructor(
        @InjectRepository(AmountUnit)
        private amountRepository: Repository<AmountUnit>,
      ) {}
    
      getAmountUnits(): Promise<AmountUnit[]> {
        return this.amountRepository.find();
      }
}
