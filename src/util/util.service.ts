import { Injectable } from '@nestjs/common';
import { UtilDTO } from './entities/util.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Util } from './entities/util.entity';

@Injectable()
export class UtilService {
  constructor(
    @InjectRepository(Util)
    private utilRepository: Repository<Util>,
  ) {}

  async findOrCreate(utilDTO: UtilDTO): Promise<Util> {
    let util = await this.utilRepository.findOne({
      where: {
        name: ILike(`${utilDTO.name}`),
      },
    });

    if (!util) {
      util = this.utilRepository.create({
        name: utilDTO.name,
      });
    }

    return util;
  }
}
