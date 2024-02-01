import { Test, TestingModule } from '@nestjs/testing';
import { AmountUnitService } from './amount-unit.service';

describe('AmountUnitService', () => {
  let service: AmountUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmountUnitService],
    }).compile();

    service = module.get<AmountUnitService>(AmountUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
