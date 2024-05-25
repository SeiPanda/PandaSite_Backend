import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { Recipe } from './entities/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeUnitModule } from 'src/time-unit/time-unit.module';
import { CategoryModule } from 'src/category/category.module';
import { DifficultyModule } from 'src/difficulty/difficulty.module';
import { InstructionModule } from 'src/instruction/instruction.module';
import { InstructionIngredient } from 'src/instruction_ingredient/entities/instructionIngredient.entity';
import { Instruction } from 'src/instruction/entities/instruction.entity';
import { Util } from 'src/util/entities/util.entity';
import { UtilModule } from 'src/util/util.module';
import { IngredientModule } from 'src/ingredient/ingredient.module';
import { AmountUnitModule } from 'src/amount-unit/amount-unit.module';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipe]),
    TimeUnitModule,
    CategoryModule,
    DifficultyModule,
    InstructionModule,
    UtilModule,
    IngredientModule,
    AmountUnitModule,
    TypeOrmModule.forFeature([InstructionIngredient]),
    TypeOrmModule.forFeature([Instruction]),
    TypeOrmModule.forFeature([Util]),
    TypeOrmModule.forFeature([Ingredient]),
    AuthModule,
  ],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
