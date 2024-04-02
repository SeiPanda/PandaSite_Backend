import { IngredientDTO } from "src/ingredient/entities/ingredient.dto";
import { RecipeDTO, RecipeThinDTO } from "src/recipe/entities/recipe.dto";
import { Recipe } from "src/recipe/entities/recipe.entity";

function mapRecipeThinToDTO(recipe: Recipe): RecipeThinDTO {
    return {
        id: recipe.id,
        title: recipe.title,
        score: recipe.score,
        time: recipe.time,
        timeUnit: recipe.timeUnit,
        image: recipe.imagePath,
        description: recipe.description,
        calories: recipe.calories,
        protein: recipe.protein,
        portionSize: recipe.portionSize,
        difficulty: recipe.difficulty?.name,
        categories: recipe.categories?.map((category) => { 
            return {
                name: category.name 
            } 
        }),
    };
}

export { mapRecipeThinToDTO };