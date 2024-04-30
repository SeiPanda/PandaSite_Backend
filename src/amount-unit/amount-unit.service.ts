import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { AmountUnit } from './entities/amountUnit.entity';
import { AmountUnitDTO } from './entities/amountUnit.dto';

@Injectable()
export class AmountUnitService {
  constructor(
    @InjectRepository(AmountUnit)
    private amountRepository: Repository<AmountUnit>,
  ) {}

  getAmountUnits(): Promise<AmountUnit[]> {
    return this.amountRepository.find();
  }

  async findOrCreate(amountUnitDTO: AmountUnitDTO): Promise<AmountUnit> {
    let amountUnit = await this.amountRepository.findOne({
      where: {
        id: ILike(`${amountUnitDTO.id}`),
        name: ILike(`${amountUnitDTO.name}`),
      },
    });

    if (!amountUnit) {
      amountUnit = this.amountRepository.create({
        id: amountUnitDTO.id,
        name: amountUnitDTO.name,
      });
      amountUnit = await this.amountRepository.save(amountUnit);
    }

    return amountUnit;
  }
}
