import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { DifficultyService } from 'src/difficulty/difficulty.service';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @Inject(forwardRef(() => DifficultyService))
    private readonly difficultyService: DifficultyService,
  ) {}

  async findAllFull(): Promise<Recipe[]> {
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
        ingredients: true,
      },
    });
  }

  // async findAllShort(): Promise<GetRecipeShortDTO[]> {
  //   let recipesFull = await this.findAllFull();
  //   const recipesToReturn: GetRecipeShortDTO[] = [];

  //   for (const recipeFull of recipesFull) {
  //     recipesToReturn.push(recipeFull as GetRecipeShortDTO);
  //   }
  //   return recipesFull;
  // }

  findOne(id: number): Promise<Recipe> {
    return this.recipeRepository.findOneBy({ id });
  }

  /* create(recipe: CreateRecipeDTO) {
    
  } */
}
