import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Difficulty } from './entities/difficulty.entity';
import { CreateDifficultyDTO } from './entities/create-difficulty.dto';
import { UpdateDifficultyDTO } from './entities/update-difficulty.dto';

@Injectable()
export class DifficultyService {
  constructor(
    @InjectRepository(Difficulty)
    private difficultyRepository: Repository<Difficulty>,
  ) {}

  async findAll(): Promise<Difficulty[]> {
    return this.difficultyRepository.find();
  }

  async findOne(id: number): Promise<Difficulty> {
    return this.difficultyRepository.findOneBy({ id });
  }

  async create(difficulty: CreateDifficultyDTO) {
    // if ((await this.findOne(difficulty.id)) !== null) {
    //   throw new EntityCreationFailedAlreadyExistingError(Difficulty, '');
    // }

    return this.difficultyRepository.insert(difficulty);
  }

  async delete(id: number) {
    return this.difficultyRepository.delete({ id });
  }

  async update(id: number, updateDifficultyDto: UpdateDifficultyDTO) {
    return this.difficultyRepository.update(id, {
      name: updateDifficultyDto.name,
    });
  }
}
