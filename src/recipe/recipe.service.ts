import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { RecipeThinDTO } from './entities/recipe.dto';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  getRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.find({
      relations: {
        categories: true,
        timeUnit: true,
        difficulty: true
      },
    });
  }

  getRecipeById(id: number): Promise<Recipe> {
    return this.recipeRepository.findOne({
        where: {
          id
        },
        relations: {
          instructions: {
            ingredients: {
              ingredient: true,
              amountUnit: true,
            },
            utils: true,
          },
          categories: true,
          timeUnit: true,
          difficulty: true
        },
    });
  }
}
