import { Test, TestingModule } from '@nestjs/testing';
import { AmountUnitController } from './amount-unit.controller';
import { AmountUnitService } from './amount-unit.service';

describe('AmountUnitController', () => {
  let controller: AmountUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AmountUnitController],
      providers: [AmountUnitService],
    }).compile();

    controller = module.get<AmountUnitController>(AmountUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
