import { Controller } from '@nestjs/common';
import { RecipeIngredientService } from './recipe_ingredient.service';

@Controller('recipe-ingredient')
export class RecipeIngredientController {
  constructor(
    private readonly recipeIngredientService: RecipeIngredientService,
  ) {}
}
