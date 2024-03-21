import { Controller, Get, Param } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Recipe } from './entities/recipe.entity';
import { Instruction } from 'src/instruction/entities/instruction.entity';
import { RecipeDTO } from './entities/recipe.dto';
import { mapRecipeToDTO } from 'src/mappers/recipe.mapper';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  /* @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  } */

  @Get()
  async findAll(/* @Query() queryParams */): Promise<RecipeDTO[]> {
    // if (queryParams.format === 'short') {
    //   return this.recipeService.findAllShort();
    // }
    const allRecipes = await this.recipeService.getRecipes();
    const recipesToReturn: RecipeDTO[] = [];
    for (const recipe of allRecipes) {
      recipesToReturn.push(mapRecipeToDTO(recipe));
    }
    return recipesToReturn;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.getRecipeById(+id);
  }

  /*   @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  } */

  /* mapInstructionIngredientsToRecipe(
    instructions: Instruction[],
    recipe: Recipe,
  ): RecipeDTO {
    if (!Array.isArray(recipe.ingredients)) {
      recipe.ingredients = [];
    }

    //const recipeToReturn: RecipeDTO = structuredClone(recipe);

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
            name: ingredient.ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.amountUnit.name,
          });
        } else {
          recipeIngredient.amount += ingredient.amount;
        }
      }
    }

    return recipeToReturn;
  } */
}
