import { Injectable } from '@nestjs/common';
import { InstructionDTO } from './entities/instruction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Instruction } from './entities/instruction.entity';
import { UtilService } from 'src/util/util.service';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { InstructionIngredientService } from 'src/instruction_ingredient/instruction_ingredient.service';
import { InstructionIngredientDTO } from 'src/instruction_ingredient/entities/instruction_ingredient.dto';

@Injectable()
export class InstructionService {
  constructor(
    @InjectRepository(Instruction)
    private instructionRepository: Repository<Instruction>,

    private utilService: UtilService,
    private instructionIngredientService: InstructionIngredientService,
    private ingredientService: IngredientService,
  ) {}

  async create(instructionDTO: InstructionDTO): Promise<Instruction> {
    const instruction: DeepPartial<Instruction> = {
      step: instructionDTO.step,
      content: instructionDTO.content,
      title: instructionDTO.title,
      utils: [],
      ingredients: [],
    };
    /* const instruction = this.instructionRepository.create({
      step: instructionDTO.step,
      content: instructionDTO.content,
      title: instructionDTO.title,
      utils: [],
      ingredients: [],
    }); */

    // Set the DTO id so the DTO can be deeply inserted
    //instructionDTO.id = instruction.id;

    /* Set all utils for the instruction */
    /*for (const utilDTO of instructionDTO.utils) {
      const utilToAdd = await this.utilService.findOrCreate(utilDTO);
      instruction.utils.push(utilToAdd);
    }*(/)

    /* Set all ingredients for the instruction */
    /*for (const ingredientDTO of instructionDTO.ingredients) {
      const instructionIngredientDTO = new InstructionIngredientDTO();
      instructionIngredientDTO.instruction = instructionDTO;

      const ingredient =
        await this.ingredientService.findOrCreate(ingredientDTO);
      ingredientDTO.id = ingredient.id;

      instructionIngredientDTO.ingredient = ingredientDTO;

      instructionIngredientDTO.amount = ingredientDTO.amount;
      instructionIngredientDTO.amountUnit = ingredientDTO.unit;
      const instructionIngredient =
        await this.instructionIngredientService.create(
          instructionIngredientDTO,
        );
      instruction.ingredients.push(instructionIngredient);
    }*/

    console.log(instruction);
    return await this.instructionRepository.save(instruction);
  }
}
