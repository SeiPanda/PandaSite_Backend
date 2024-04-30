import { Injectable } from '@nestjs/common';
import { InstructionIngredient } from './entities/instructionIngredient.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstructionIngredientDTO } from './entities/instruction_ingredient.dto';

@Injectable()
export class InstructionIngredientService {
  constructor(
    @InjectRepository(InstructionIngredient)
    private instructionIngredientRepository: Repository<InstructionIngredient>,
  ) {}

  async create(
    instructionIngredientDTO: InstructionIngredientDTO,
  ): Promise<InstructionIngredient> {
    const instructionIngredient = this.instructionIngredientRepository.create({
      amount: instructionIngredientDTO.amount,
    });
    this.instructionIngredientRepository.save(instructionIngredient);

    return instructionIngredient;
  }
}
