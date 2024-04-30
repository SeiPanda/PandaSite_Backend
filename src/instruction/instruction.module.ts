import { Module } from '@nestjs/common';
import { InstructionService } from './instruction.service';
import { InstructionController } from './instruction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instruction } from './entities/instruction.entity';
import { UtilModule } from 'src/util/util.module';
import { InstructionIngredientModule } from 'src/instruction_ingredient/instruction_ingredient.module';
import { IngredientModule } from 'src/ingredient/ingredient.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Instruction]),
    UtilModule,
    InstructionIngredientModule,
    IngredientModule,
  ],
  controllers: [InstructionController],
  providers: [InstructionService],
  exports: [InstructionService],
})
export class InstructionModule {}
