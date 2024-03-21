import { IngredientDTO } from "src/ingredient/entities/ingredient.dto";
import { RecipeDTO } from "src/recipe/entities/recipe.dto";
import { Recipe } from "src/recipe/entities/recipe.entity";

function mapRecipeToDTO(recipe: Recipe): RecipeDTO {
    return {
        title: recipe.title,
        score: recipe.score,
        time: recipe.time,
        timeUnit: recipe.timeUnit,
        imagePath: recipe.imagePath,
        calories: recipe.calories,
        carbs: recipe.carbs,
        fiber: recipe.fiber,
        protein: recipe.protein,
        fat: recipe.fat,
        sugar: recipe.sugar,
        portionSize: recipe.portionSize,
        difficulty: recipe.difficulty.name,
        categories: recipe.categories?.map((category) => { 
            return {
                name: category.name 
            } 
        }),
        instructions: recipe.instructions.map((instruction) => {
            return {
                step: instruction.step,
                content: instruction.content,
                title: instruction.title,
                utils: instruction.utils.map((util) => {
                    return {
                        name: util.name
                    }
                }),
                ingredients: instruction.ingredients.map((ingredient) => { 
                    return { 
                        name: ingredient.ingredient.name, 
                        amount: ingredient.amount, 
                        unit: { 
                            id: ingredient.amountUnit.id, 
                            name: ingredient.amountUnit.name 
                        }
                    }
                }),
            }
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

function getCumulatedIngredientDTOs(
    recipe: Recipe,
  ): IngredientDTO[] {
    if (!Array.isArray(recipe.ingredients)) {
      recipe.ingredients = [];
    }

    const ingredientsToReturn: IngredientDTO[] = [];

    for (const instruction of recipe.instructions) {
      const ingredients = instruction.ingredients;
      for (const ingredient of ingredients) {
        const recipeIngredient = ingredientsToReturn.find(
          (recipeIngredient) =>
            recipeIngredient.name === ingredient.ingredient.name &&
            recipeIngredient.unit.id === ingredient.amountUnit.id,
        );
        // Ingredient already existent in recipe?
        if (recipeIngredient === undefined) {
          ingredientsToReturn.push({
            name: ingredient.ingredient.name,
            amount: ingredient.amount,
            unit: {
                id: ingredient.amountUnit.id,
                name: ingredient.amountUnit.name,
            }
          });
        } else {
          recipeIngredient.amount += ingredient.amount;
        }
      }
    }

    return ingredientsToReturn;
  }

export { mapRecipeToDTO };