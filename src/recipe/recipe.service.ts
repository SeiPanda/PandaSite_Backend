import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeDto } from './entities/createRecipe.dto';
import { TimeUnitService } from 'src/time-unit/time-unit.service';
import { CategoryService } from 'src/category/category.service';
import { DifficultyService } from 'src/difficulty/difficulty.service';
import { InstructionService } from 'src/instruction/instruction.service';
import { InstructionIngredient } from 'src/instruction_ingredient/entities/instructionIngredient.entity';
import { Instruction } from 'src/instruction/entities/instruction.entity';
import { UtilService } from 'src/util/util.service';
import { IngredientService } from 'src/ingredient/ingredient.service';
import { AmountUnitService } from 'src/amount-unit/amount-unit.service';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,

    private timeUnitService: TimeUnitService,
    private categoryService: CategoryService,
    private difficultyService: DifficultyService,
    private utilService: UtilService,
    private ingredientService: IngredientService,
    private instructionService: InstructionService,
    private amountUnitService: AmountUnitService,

    @InjectRepository(InstructionIngredient)
    private instructionIngredientRepository: Repository<InstructionIngredient>,

    @InjectRepository(Instruction)
    private instructionRepository: Repository<Instruction>,

    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  getRecipes(): Promise<Recipe[]> {
    return this.recipeRepository.find({
      relations: {
        categories: true,
        timeUnit: true,
        difficulty: true,
      },
    });
  }

  async getRecipeById(id: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      where: {
        id,
      },
      relations: {
        instructions: {
          ingredients: {
            ingredient: true,
            amountUnit: true,
          },
          utils: true,
        },
        categories: true,
        timeUnit: true,
        difficulty: true,
      },
    });
    return recipe;
  }

  async create(recipeDto: CreateRecipeDto) {
    let recipe = this.recipeRepository.create({
      title: recipeDto.title,
      description: recipeDto.description,
      score: recipeDto.score,
      time: recipeDto.time,
      calories: recipeDto.calories,
      carbs: recipeDto.carbs,
      fiber: recipeDto.fiber,
      protein: recipeDto.protein,
      fat: recipeDto.fat,
      sugar: recipeDto.sugar,
      portionSize: recipeDto.portionSize,
      categories: [],
      instructions: [],
    });
    recipe = await this.recipeRepository.save(recipe);
    /*const recipe = this.recipeRepository.create({
      title: recipeDto.title,
      description: recipeDto.description,
      score: recipeDto.score,
      time: recipeDto.time,
      calories: recipeDto.calories,
      carbs: recipeDto.carbs,
      fiber: recipeDto.fiber,
      protein: recipeDto.protein,
      fat: recipeDto.fat,
      sugar: recipeDto.sugar,
      portionSize: recipeDto.portionSize,
      categories: [],
      instructions: [],
    });*/

    /* Set the difficulty */
    const difficulty = await this.difficultyService.findOrCreate(
      recipeDto.difficulty,
    );
    recipe.difficulty = difficulty;

    /* Set the time unit */
    const timeUnit = await this.timeUnitService.findOrCreate(
      recipeDto.timeUnit,
    );
    recipe.timeUnit = timeUnit;

    /* Set all categories */
    for (const categoryDto of recipeDto.categories) {
      const categoryToAdd =
        await this.categoryService.findOrCreate(categoryDto);
      recipe.categories.push(categoryToAdd);
    }

    /* Set all instructions */
    /* for (const instructionDto of recipeDto.instructions) {
      const instructionToAdd =
        await this.instructionService.create(instructionDto);
      console.log(instructionToAdd);
      recipe.instructions.push(instructionToAdd);
    } */

    for (const instructionDto of recipeDto.instructions) {
      let instruction = this.instructionRepository.create({
        step: instructionDto.step,
        title: instructionDto.title,
        content: instructionDto.content,
        utils: [],
        ingredients: [],
      });
      instruction = await this.instructionRepository.save(instruction);

      for (const utilDto of instructionDto.utils) {
        const util = await this.utilService.findOrCreate({
          name: utilDto.name,
        });
        instruction.utils.push(util);
      }

      for (const ingredientDto of instructionDto.ingredients) {
        const ingredient = await this.ingredientService.findOrCreate({
          singleName: ingredientDto.singleName,
          pluralName: ingredientDto.pluralName,
          amount: null,
          unit: null,
        });

        const amountUnit = await this.amountUnitService.findOrCreate({
          id: ingredientDto.unit.id,
          name: ingredientDto.unit.name,
        });

        let instructionIngredient = this.instructionIngredientRepository.create(
          {
            ingredientId: ingredient.id,
            instructionId: instruction.id,
            ingredient: ingredient,
            instruction: instruction,
            amount: ingredientDto.amount,
            amountUnit,
          },
        );

        instructionIngredient = await this.instructionIngredientRepository.save(
          instructionIngredient,
        );
      }
      recipe.instructions.push(instruction);
    }

    //recipe.imagePath = await this.saveImage(recipeDto.image);

    recipe = await this.recipeRepository.save(recipe);
    return this.getRecipeById(recipe.id);
  }

  saveImage(imageBase64: string): Promise<string> {
    if (!imageBase64) {
      return Promise.reject();
    }
    // To be implemented. Returns the path of the saved file.
    return Promise.reject();
  }
}
