import { Module } from '@nestjs/common';
import { InstructionIngredientService } from './instruction_ingredient.service';
import { InstructionIngredientController } from './instruction_ingredient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructionIngredient } from './entities/instructionIngredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstructionIngredient])],
  controllers: [InstructionIngredientController],
  providers: [InstructionIngredientService],
})
export class InstructionIngredientModule {}
