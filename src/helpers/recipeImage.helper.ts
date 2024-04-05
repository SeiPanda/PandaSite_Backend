import { Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { Recipe } from 'src/recipe/entities/recipe.entity';

export function loadImage(recipe: Recipe) {

  /* Image path in DB null? */
  if (!recipe.imagePath) {
    return (
      'data:image/jpeg;base64,' +
      loadDummyImage()
    );
  }

  let fileBase64: string = undefined;
  try {
    fileBase64 = readFileSync(`./src/storage/images/${recipe.imagePath}`, 'base64');
  } catch (error) {
    Logger.verbose('Recipe image not found, delivering dummy_do_not_delete.jpg');
    fileBase64 = loadDummyImage();
  }

  return (
    'data:image/jpeg;base64,' +
    fileBase64
  );
}

export function loadDummyImage() {
  return readFileSync(`./src/storage/images/dummy_do_not_delete.jpg`, 'base64');
}
