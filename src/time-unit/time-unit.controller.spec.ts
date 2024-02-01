import { Test, TestingModule } from '@nestjs/testing';
import { TimeUnitController } from './time-unit.controller';
import { TimeUnitService } from './time-unit.service';

describe('TimeUnitController', () => {
  let controller: TimeUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TimeUnitController],
      providers: [TimeUnitService],
    }).compile();

    controller = module.get<TimeUnitController>(TimeUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
