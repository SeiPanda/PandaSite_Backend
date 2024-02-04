import { Controller, Get } from '@nestjs/common';
import { UtilService } from './util.service';

@Controller('util')
export class UtilController {
  constructor(private readonly utilService: UtilService) {}

  @Get()
  async getAllUtils() {
    const utils = await this.utilService.getUtils();
    return utils;
  }
}
