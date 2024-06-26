import { getFullImageURL } from 'src/helpers/recipeImage.helper';
import { IngredientDTO } from 'src/ingredient/entities/ingredient.dto';
import { RecipeDTO } from 'src/recipe/entities/recipe.dto';
import { Recipe } from 'src/recipe/entities/recipe.entity';

function mapRecipeToDTO(recipe: Recipe): RecipeDTO {
  return {
    id: recipe.id,
    title: recipe.title,
    score: recipe.score,
    time: recipe.time,
    timeUnit: recipe.timeUnit,
    image: getFullImageURL(recipe),
    description: recipe.description,
    calories: recipe.calories,
    carbs: recipe.carbs,
    fiber: recipe.fiber,
    protein: recipe.protein,
    fat: recipe.fat,
    sugar: recipe.sugar,
    portionSize: recipe.portionSize,
    difficulty: recipe.difficulty?.name,
    categories: recipe.categories?.map((category) => {
      return {
        name: category.name,
      };
    }),
    instructions: recipe.instructions?.map((instruction) => {
      return {
        step: instruction.step,
        content: instruction.content,
        title: instruction.title,
        utils: instruction.utils?.map((util) => {
          return {
            name: util.name,
          };
        }),
        ingredients: instruction.ingredients?.map((ingredient) => {
          return {
            singleName: ingredient.ingredient?.singleName,
            pluralName: ingredient.ingredient?.pluralName,
            amount: ingredient.amount,
            unit: {
              id: ingredient.amountUnit?.id,
              name: ingredient.amountUnit?.name,
            },
          };
        }),
      };
    }),
    /* ingredients: recipe.ingredients ? 
            recipe.ingredients.map((ingredient) => { 
                return { 
                    name: ingredient.ingredient.name, 
                    amount: ingredient.amount, 
                    unit: { 
                        id: ingredient.amountUnit.id, 
                        name: ingredient.amountUnit.name 
                    }
                }
            }), */
    ingredients: getCumulatedIngredientDTOs(recipe),
  };
}

function getCumulatedIngredientDTOs(recipe: Recipe): IngredientDTO[] {
  const ingredientsToReturn: IngredientDTO[] = [];

  if (!recipe.instructions) {
    return ingredientsToReturn;
  }

  for (const instruction of recipe.instructions) {
    const ingredients = instruction.ingredients;
    for (const ingredient of ingredients) {
      const recipeIngredient = ingredientsToReturn.find(
        (recipeIngredient) =>
          recipeIngredient.singleName === ingredient.ingredient?.singleName &&
          recipeIngredient.unit.id === ingredient.amountUnit?.id,
      );
      // Ingredient already existent in recipe?
      if (recipeIngredient === undefined) {
        ingredientsToReturn.push({
          singleName: ingredient.ingredient.singleName,
          pluralName: ingredient.ingredient.pluralName,
          amount: ingredient.amount,
          unit: {
            id: ingredient.amountUnit.id,
            name: ingredient.amountUnit.name,
          },
        });
      } else {
        recipeIngredient.amount += ingredient.amount;
      }
    }
  }

  return ingredientsToReturn;
}

export { mapRecipeToDTO };
