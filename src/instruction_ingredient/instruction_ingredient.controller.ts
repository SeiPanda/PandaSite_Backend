import { Controller } from '@nestjs/common';
import { InstructionIngredientService } from './instruction_ingredient.service';

@Controller('instruction-ingredient')
export class InstructionIngredientController {
  constructor(
    private readonly instructionIngredientService: InstructionIngredientService,
  ) {}
}
