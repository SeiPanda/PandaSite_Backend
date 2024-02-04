import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Util } from './entities/util.entity';

@Injectable()
export class UtilService {
  constructor(
    @InjectRepository(Util)
    private bookRepository: Repository<Util>,
  ) {}

  getUtils(): Promise<Util[]> {
    return this.bookRepository.find();
  }
}
