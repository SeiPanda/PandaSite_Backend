import { Controller, Get, Param } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './entities/recipe.entity';
import { Instruction } from 'src/instruction/entities/instruction.entity';
import { GetRecipeDTO } from './entities/get-recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  /* @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  } */

  @Get()
  async findAll(/* @Query() queryParams */): Promise<GetRecipeDTO[]> {
    // if (queryParams.format === 'short') {
    //   return this.recipeService.findAllShort();
    // }
    const allRecipes = await this.recipeService.findAllFull();
    const recipesToReturn = [];
    for (const recipe of allRecipes) {
      const recipeToReturn = this.mapInstructionIngredientsToRecipe(
        recipe.instructions,
        recipe,
      );
      recipesToReturn.push(recipeToReturn);
    }
    return recipesToReturn;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }

  /*   @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  } */

  mapInstructionIngredientsToRecipe(
    instructions: Instruction[],
    recipe: Recipe,
  ): GetRecipeDTO {
    if (!Array.isArray(recipe.ingredients)) {
      recipe.ingredients = [];
    }

    const recipeToReturn: GetRecipeDTO = structuredClone(recipe);

    for (const instruction of instructions) {
      const ingredients = instruction.ingredients;
      for (const ingredient of ingredients) {
        const recipeIngredient = recipe.ingredients.find(
          (recipeIngredient) =>
            recipeIngredient.ingredient.id === ingredient.ingredient.id &&
            recipeIngredient.amountUnit === ingredient.amountUnit,
        );
        console.log(recipeIngredient);
        // Ingredient already existent in recipe?
        if (recipeIngredient === undefined) {
          recipeToReturn.ingredients.push({
            ingredient: {
              id: ingredient.ingredient.id,
              name: ingredient.ingredient.name,
            },
            amount: ingredient.amount,
            amountUnit: ingredient.amountUnit,
          });
        } else {
          recipeIngredient.amount += ingredient.amount;
        }
      }
    }

    return recipeToReturn;
  }
}
