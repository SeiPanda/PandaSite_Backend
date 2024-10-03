import { Logger } from '@nestjs/common';
import { readFileSync } from 'fs';
import { ImageService } from 'src/image/image.service';
import { Recipe } from 'src/recipe/entities/recipe.entity';

export function getFullImageURL(recipe: Recipe) {
  const imageService = new ImageService();
  if (!recipe.imagePath) {
    return '/presets/dummy_do_not_delete.jpg';
  }

  return '/images/' + recipe.imagePath;
}

export function loadDummyImage() {
  //return readFileSync(`./src/storage/images/dummy_do_not_delete.jpg`, 'base64');
}
