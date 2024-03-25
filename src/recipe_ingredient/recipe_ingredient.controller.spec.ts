import { Test, TestingModule } from '@nestjs/testing';
import { RecipeIngredientController } from './recipe_ingredient.controller';
import { RecipeIngredientService } from './recipe_ingredient.service';

describe('RecipeIngredientController', () => {
  let controller: RecipeIngredientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeIngredientController],
      providers: [RecipeIngredientService],
    }).compile();

    controller = module.get<RecipeIngredientController>(
      RecipeIngredientController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
