import { readFile, readdir } from 'node:fs/promises';
import { Importer } from '../../abstracts/Importer.abstract';
import { TextBlockRange } from 'src/cli/interfaces/TextBlockRange.interface';
import { CreateInstructionDTO } from 'src/instruction/entities/create-instruction.dto';
import { CreateUtilDTO } from 'src/util/entities/create-util.dto';
import { CreateIngredientDTO } from 'src/ingredient/entities/create-ingredient.dto';
import { CreateRecipeDTO } from 'src/recipe/entities/create-recipe.dto';
import { Nutrition } from 'src/cli/interfaces/Nutritions.interface';
import { CreateTimeDTO } from 'src/general/dto/create-time.dto';
import { CreateDifficultyDTO } from 'src/difficulty/entities/create-difficulty.dto';
import { CreateCategoryDTO } from 'src/category/entities/create-category.dto';
import { RecipeService } from 'src/recipe/recipe.service';

export class RecipeImporter extends Importer {
  constructor(pathToImport: string) {
    super(pathToImport);
  }

  async import() {
    try {
      const files = await readdir(this.pathToImport);
      console.log(
        `Found ${files.length} file${files.length === 1 ? '' : 's'} to import`,
      );
      for (const filename of files) {
        console.log(`-- Importing ${filename}`);
        await this.importFile(this.pathToImport, filename);
      }
    } catch (error) {
      console.log('An error occurred importing the recipes!');
      console.error(error);
    }
  }

  async importFile(filePath: string, fileName: string) {
    if (!filePath || !fileName) {
      console.log('No filepath or filename provided!');
      return;
    }

    const fileContent = await this.getFileContent(filePath, fileName);

    const title = this.getTitle(fileContent);
    const portionSize = this.getPortionsSize(fileContent);
    const recipeIngredients = this.getRecipeIngredients(fileContent);
    const instructions = this.getInstructions(fileContent);
    const nutritions = this.getNutritions(fileContent);
    const duration = this.getDuration(fileContent);
    const difficulty = this.getDifficulty(fileContent);
    const categories = this.getCategories(fileContent);
    const score = this.getScore(fileContent);

    const recipe: CreateRecipeDTO = {
      title,
      calories: nutritions.calories,
      portionSize,
      ingredients: recipeIngredients,
      instructions,
      carbs: nutritions.carbs,
      fiber: nutritions.fiber,
      fat: nutritions.fat,
      sugar: nutritions.sugar,
      protein: nutritions.protein,
      time: duration,
      difficulty: difficulty,
      categories: categories,
      score: score,
    };

    this.saveRecipeToDatabase(recipe);
  }

  /**
   * Reads the content of a file given its file path and name, and returns the content as a string.
   * @param {string} filePath - String that represents the path to the file you want to read.
   * It should include the directory path and any subdirectories if applicable.
   * @param {string} fileName - String that represents the name of the file you want to read.
   * @returns the content of the file as a string.
   */
  async getFileContent(filePath: string, fileName: string) {
    if (!filePath || !fileName) {
      console.log('No filepath or filename provided!');
      return;
    }

    let content = await readFile(`${filePath}${fileName}`, 'utf8');
    if (!content.endsWith('\n')) {
      content += '\n';
    }
    return content;
  }

  /**
   * Checks if a line of text is empty or contains only whitespace characters.
   * @param {string} lineContent - String to check
   * @returns true if the line is empty, false otherwhise.
   */
  private isLineEmpty(lineContent: string): boolean {
    return lineContent.length === 0 || !lineContent.trim();
  }

  private getTitle(fileContent: string): string {
    for (const [index, lineContent] of fileContent.split(/\r?\n/).entries()) {
      if (this.isLineEmpty(lineContent)) {
        continue;
      }

      if (index === 0) {
        return lineContent;
      }
    }
    return undefined;
  }

  private getCalories(fileContent: string): number {
    for (const [index, lineContent] of fileContent.split(/\r?\n/).entries()) {
      if (this.isLineEmpty(lineContent)) {
        continue;
      }

      if (index === 1) {
        return parseInt(lineContent.split(' ')[0]);
      }
    }
    return undefined;
  }

  private getRecipeIngredients(fileContent: string): CreateIngredientDTO[] {
    const allLines = this.getTextBlockBeginningWith(
      'Zutaten für',
      fileContent,
    ).map((lineContent) => lineContent.substring(1));

    let ingredientsToReturn = [];
    for (const line of allLines) {
      ingredientsToReturn = [
        ...ingredientsToReturn,
        ...this.convertIngredientLine(line),
      ];
    }
    return ingredientsToReturn;
  }

  /**
   * Converts a raw ingredient line into an array of IngredientAmount objects.
   * @param {string} ingredientLineRaw - A string representing a line of ingredients. Each ingredient
   * is separated by a comma.
   * @returns an array of `IngredientAmount` objects.
   */
  private convertIngredientLine(
    ingredientLineRaw: string,
  ): CreateIngredientDTO[] {
    const ingredientsToReturn = [];
    const ingredientComponent = ingredientLineRaw.split(',');
    for (const ingredientText of ingredientComponent) {
      const ingredient = this.convertSingleIngredient(ingredientText);
      ingredientsToReturn.push(ingredient);
    }
    return ingredientsToReturn;
  }

  /**
   * Takes a raw ingredient string and extracts the ingredient
   * name, amount, and unit, and returns an object with these values.
   * @param {string} ingredientRaw - The `ingredientRaw` parameter is a string that represents a single
   * ingredient in a raw format. It typically consists of the ingredient name followed by the amount
   * and unit in parentheses.
   * @returns {IngredientAmount} an object of type IngredientAmount.
   */
  private convertSingleIngredient(ingredientRaw: string): CreateIngredientDTO {
    const ingredientName = ingredientRaw.split('(')[0].trim();
    const ingredientAmountFull = ingredientRaw
      .split('(')[1]
      .slice(0, ingredientRaw.length - 1)
      .trim();

    const amount = parseInt(ingredientAmountFull.split(' ')[0].trim());
    const amountUnit = ingredientAmountFull
      .split(' ')[1]
      .slice(0, ingredientAmountFull.split(' ')[1].length - 1)
      .trim();

    return {
      name: ingredientName,
      amount,
      amountUnit,
    };
  }

  private getPortionsSize(fileContent: string): number {
    for (const lineContent of fileContent.split(/\r?\n/)) {
      if (lineContent.startsWith('Anleitung für')) {
        return parseInt(lineContent.split(' ')[2]);
      }
    }
    return undefined;
  }

  private getTextBlockBeginningWith(
    blockStartString: string,
    fileContent: string,
  ): string[] {
    const instructionsRange: TextBlockRange = {
      begin: 0,
      end: 0,
    };
    for (const [index, lineContent] of fileContent.split(/\r?\n/).entries()) {
      if (
        lineContent.toLowerCase().startsWith(blockStartString.toLowerCase())
      ) {
        instructionsRange.begin = index + 1;
      }
      if (
        this.isLineEmpty(lineContent) &&
        index >= instructionsRange.begin &&
        instructionsRange.begin !== 0
      ) {
        instructionsRange.end = index - 1;
        break;
      }
    }
    return fileContent
      .split(/\r?\n/)
      .slice(instructionsRange.begin, instructionsRange.end + 1);
  }

  private getInstructions(fileContent: string): CreateInstructionDTO[] {
    const allInstructionLines = this.getTextBlockBeginningWith(
      'Anleitung für',
      fileContent,
    );

    const instructions: CreateInstructionDTO[] = [];
    for (const instructionLine of allInstructionLines) {
      const stepId = parseInt(instructionLine.split('.')[0]);
      const instructionContent = instructionLine.split('.')[1].trim();

      const stepUtils: CreateUtilDTO[] = this.getInstructionUtils(
        stepId,
        fileContent,
      );

      const instructionIngredients = this.getInstructionIngredients(
        stepId,
        fileContent,
      );

      const instruction: CreateInstructionDTO = {
        step: stepId,
        content: instructionContent,
        utils: stepUtils,
        ingredients: instructionIngredients,
      };
      instructions.push(instruction);
    }
    return instructions;
  }

  private getInstructionUtils(
    instructionId: number,
    fileContent: string,
  ): CreateUtilDTO[] {
    const utilsToReturn: CreateUtilDTO[] = [];

    const utilLines = this.getTextBlockBeginningWith('Util:', fileContent);
    for (const utilLine of utilLines) {
      const utilLineParts = utilLine.split('.');
      if (parseInt(utilLineParts[0]) !== instructionId) {
        continue;
      }

      const utilToAdd = {
        name: utilLineParts[1].trim(),
      };

      utilsToReturn.push(utilToAdd);
    }
    return utilsToReturn;
  }

  private getInstructionIngredients(
    instructionId: number,
    fileContent: string,
  ): CreateIngredientDTO[] {
    const ingredientsToReturn: CreateIngredientDTO[] = [];

    const instructionIngredientLines = this.getTextBlockBeginningWith(
      'Schritte Zutaten:',
      fileContent,
    );

    for (const instructionIngredientsLine of instructionIngredientLines) {
      const instructionIngredientsLineParts =
        instructionIngredientsLine.split('.');
      if (parseInt(instructionIngredientsLineParts[0]) !== instructionId) {
        continue;
      }

      const differentInstructionIngredients = this.convertIngredientLine(
        instructionIngredientsLineParts[1],
      );

      for (const instructionIngredient of differentInstructionIngredients) {
        ingredientsToReturn.push(instructionIngredient);
      }
    }
    return ingredientsToReturn;
  }

  private getNutritions(fileContent: string): Nutrition {
    const nutrition: Nutrition = {
      /* Load calories seperately */
      calories: this.getCalories(fileContent),
    };

    const nutritionLines = this.getTextBlockBeginningWith(
      'Nährwerte:',
      fileContent,
    );

    for (const nutritionLine of nutritionLines) {
      let lineKey = '';

      const nutritionLineParts = nutritionLine.toLowerCase().split(':');
      switch (nutritionLineParts[0]) {
        case 'fett':
          lineKey = 'fat';
          break;
        case 'zucker':
          lineKey = 'sugar';
          break;
        case 'kohlenhydrate':
          lineKey = 'carbs';
          break;
        case 'protein':
          lineKey = 'protein';
          break;
        case 'ballaststoffe':
          lineKey = 'fiber';
          break;
      }
      if (lineKey === '') {
        throw new Error(`Unknown nutrition '${nutritionLineParts[0]}'`);
      }

      if (isNaN(parseFloat(nutritionLineParts[1].trim()))) {
        throw new Error(
          `Value of nutrition '${nutritionLineParts[0]}' has to be a number!`,
        );
      }

      nutrition[lineKey] = +nutritionLineParts[1].trim();
    }
    return nutrition;
  }

  private getDuration(fileContent: string): CreateTimeDTO | undefined {
    for (const lineContent of fileContent.split(/\r?\n/)) {
      if (this.isLineEmpty(lineContent)) {
        continue;
      }

      if (!lineContent.startsWith('Dauer:')) {
        continue;
      }

      const value = lineContent.split(':')[1].trim();
      const duration = value.split(' ')[0].trim();
      const timeUnit = value.split(' ')[1].trim();

      if (isNaN(parseFloat(duration))) {
        throw new Error(`Duration Time '${duration}' has to be a number!`);
      }

      return {
        time: +duration,
        timeUnit: {
          id: timeUnit,
          name: timeUnit,
        },
      };
    }
    return undefined;
  }

  private getDifficulty(fileContent: string): CreateDifficultyDTO | undefined {
    for (const lineContent of fileContent.split(/\r?\n/)) {
      if (this.isLineEmpty(lineContent)) {
        continue;
      }

      if (!lineContent.startsWith('Schwierigkeit:')) {
        continue;
      }

      const difficulty = lineContent.split(':')[1].trim();

      if (isNaN(parseFloat(difficulty))) {
        throw new Error(`Difficulty '${difficulty}' has to be a number!`);
      }

      return {
        id: +difficulty,
        name: difficulty,
      };
    }
    return undefined;
  }

  private getCategories(fileContent: string): CreateCategoryDTO[] {
    const categoriesToReturn: CreateCategoryDTO[] = [];

    const categoryLines = this.getTextBlockBeginningWith(
      'Kategorien:',
      fileContent,
    );

    for (const categoryLine of categoryLines) {
      categoriesToReturn.push({
        id: categoryLine.toLowerCase(),
        name: categoryLine,
      });
    }

    return categoriesToReturn;
  }

  private getScore(fileContent: string): number | undefined {
    for (const lineContent of fileContent.split(/\r?\n/)) {
      if (this.isLineEmpty(lineContent)) {
        continue;
      }

      if (!lineContent.startsWith('Bewertung:')) {
        continue;
      }

      const score = lineContent.split(':')[1].trim();

      if (isNaN(parseFloat(score))) {
        throw new Error(`Score '${score}' has to be a number!`);
      }

      return +score;
    }
    return undefined;
  }

  private async saveRecipeToDatabase(
    _recipe: CreateRecipeDTO,
  ): Promise<boolean> {
    /* try {
      await this.recipeService.create(recipe);
      return true;
    } catch (error) {
      return false;
    } */
    return true;
  }
}
