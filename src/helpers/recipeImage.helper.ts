import { readFileSync } from 'fs';
import { Recipe } from 'src/recipe/entities/recipe.entity';

export function loadImage(recipe: Recipe) {
  return (
    'data:image/jpeg;base64,' +
    readFileSync(`./src/storage/images/${recipe.imagePath}`, 'base64')
  );
}
