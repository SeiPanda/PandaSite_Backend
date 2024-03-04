import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DifficultyService } from './difficulty.service';
import { CreateDifficultyDTO } from './entities/create-difficulty.dto';
import { UpdateDifficultyDTO } from './entities/update-difficulty.dto';

@Controller('difficulty')
export class DifficultyController {
  constructor(private readonly difficultyService: DifficultyService) {}

  @Get()
  findAll() {
    return this.difficultyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.difficultyService.findOne(+id);
  }

  @Post()
  create(@Body() createDifficultyDto: CreateDifficultyDTO) {
    return this.difficultyService.create(createDifficultyDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDifficultyDto: UpdateDifficultyDTO,
  ) {
    return this.difficultyService.update(+id, updateDifficultyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.difficultyService.delete(+id);
  }
}
