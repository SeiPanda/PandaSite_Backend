import { Test, TestingModule } from '@nestjs/testing';
import { InstructionIngredientService } from './instruction_ingredient.service';

describe('InstructionIngredientService', () => {
  let service: InstructionIngredientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstructionIngredientService],
    }).compile();

    service = module.get<InstructionIngredientService>(InstructionIngredientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
