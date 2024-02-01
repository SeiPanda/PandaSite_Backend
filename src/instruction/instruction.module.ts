import { Module } from '@nestjs/common';
import { InstructionService } from './instruction.service';
import { InstructionController } from './instruction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instruction } from './entities/instruction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Instruction])],
  controllers: [InstructionController],
  providers: [InstructionService],
})
export class InstructionModule {}
