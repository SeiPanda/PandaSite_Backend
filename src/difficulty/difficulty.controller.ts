import { Controller } from '@nestjs/common';
import { DifficultyService } from './difficulty.service';

@Controller('difficulty')
export class DifficultyController {
  constructor(private readonly difficultyService: DifficultyService) {}
}
