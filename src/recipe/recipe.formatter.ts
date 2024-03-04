import { GetRecipeShortDTO } from './entities/get-recipe-short.dto';

export class RecipeFormatter {
  static toShort(/* recipe: Recipe */): GetRecipeShortDTO {
    const shortRecipe = new GetRecipeShortDTO();
    //{ title, score, time, imagePath, calories, portionSize }: GetRecipeShortDTO = recipe;
    // const shortRecipe: GetRecipeShortDTO = { ...recipe };
    // shortRecipe = recipe;
    return shortRecipe;
  }
}
