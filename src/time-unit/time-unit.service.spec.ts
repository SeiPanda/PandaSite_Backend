import { Test, TestingModule } from '@nestjs/testing';
import { TimeUnitService } from './time-unit.service';

describe('TimeUnitService', () => {
  let service: TimeUnitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeUnitService],
    }).compile();

    service = module.get<TimeUnitService>(TimeUnitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
