import { Module } from '@nestjs/common';
import { RecipeIngredientService } from './recipe_ingredient.service';
import { RecipeIngredientController } from './recipe_ingredient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeIngredient } from './entities/recipeIngredient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeIngredient])],
  controllers: [RecipeIngredientController],
  providers: [RecipeIngredientService],
})
export class RecipeIngredientModule {}
