import { getFullImageURL } from 'src/helpers/recipeImage.helper';
import { RecipeThinDTO } from 'src/recipe/entities/recipe.dto';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { SearchOptionsDTO } from 'src/recipe/entities/searchOptions.dto';

function mapRecipeSearchOptionsDTO(recipe: Recipe): SearchOptionsDTO {
  return {
    id: recipe.id,
    title: recipe.title
  };
}

export { mapRecipeSearchOptionsDTO };
