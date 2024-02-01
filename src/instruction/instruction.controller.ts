import { Controller } from '@nestjs/common';
import { InstructionService } from './instruction.service';

@Controller('instruction')
export class InstructionController {
  constructor(private readonly instructionService: InstructionService) {}
}
