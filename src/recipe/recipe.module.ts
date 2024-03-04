import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { Recipe } from './entities/recipe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DifficultyModule } from 'src/difficulty/difficulty.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe]), DifficultyModule],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
