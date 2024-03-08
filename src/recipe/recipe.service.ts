import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  async getRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.find({
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
        difficulty: true,
        ingredients: false,
      },
    });
  }

  getRecipeById(id: number): Promise<Recipe> {
    return this.recipeRepository.findOneBy({ id });
  }
}
