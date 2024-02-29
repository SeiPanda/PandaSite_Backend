import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Book} from "../book/entities/book.entity";
import {Repository} from "typeorm";
import {Recipe} from "./entities/recipe.entity";

@Injectable()
export class RecipeService {

  constructor(
      @InjectRepository(Recipe)
      private recipeRepository: Repository<Recipe>,
  ) {}

  getRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.find({
      relations: {
        instructions:  {
          instructionIngredients: true,
        },
        categories: true,
        timeUnit: true,
        difficulty: true,
      },
    });
  }
  findAll() {
    return `This action returns all recipe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }
}
