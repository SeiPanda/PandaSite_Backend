import { Injectable } from '@nestjs/common';
import { Difficulty } from './entities/difficulty.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';

@Injectable()
export class DifficultyService {
  constructor(
    @InjectRepository(Difficulty)
    private difficultyRepository: Repository<Difficulty>,
  ) {}

  async findOrCreate(name: string): Promise<Difficulty> {
    let difficulty = await this.difficultyRepository.findOne({
      where: {
        name: ILike(`${name}`),
      },
    });

    if (!difficulty) {
      difficulty = this.difficultyRepository.create({
        name: name,
      });
      difficulty = await this.difficultyRepository.save(difficulty);
    }

    return difficulty;
  }
}
