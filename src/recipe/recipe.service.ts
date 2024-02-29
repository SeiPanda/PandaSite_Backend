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

  findAll() {
    return this.recipeRepository.find({
      relations: {
        instructions: {
          ingredients: true,
        },
        categories: true,
        timeUnit: true,
        difficulty: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }
}
