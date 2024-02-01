import { Test, TestingModule } from '@nestjs/testing';
import { InstructionIngredientController } from './instruction_ingredient.controller';
import { InstructionIngredientService } from './instruction_ingredient.service';

describe('InstructionIngredientController', () => {
  let controller: InstructionIngredientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InstructionIngredientController],
      providers: [InstructionIngredientService],
    }).compile();

    controller = module.get<InstructionIngredientController>(InstructionIngredientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
