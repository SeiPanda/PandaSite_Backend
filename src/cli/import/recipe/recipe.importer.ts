import { readFile, readdir } from 'node:fs/promises';
import { Importer } from '../../abstracts/Importer.abstract';
import { IngredientAmount } from 'src/cli/interfaces/ingredientAmount.interface';
import { TextBlockRange } from 'src/cli/interfaces/TextBlockRange.interface';
import { Instruction } from 'src/instruction/entities/instruction.entity';

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
    const calories = this.getCalories(fileContent);
    const portionSize = this.getPortionsSize(fileContent);
    const recipeIngredients = this.getRecipeIngredients(fileContent);
    const instructions = this.getInstructions(fileContent);

    console.log(`Title: ${title}`);
    console.log(`Calories: ${calories} kcal`);
    console.log(`Portion Size: ${portionSize}`);
    console.log('Recipe Ingredients: ', recipeIngredients);
    console.log('Instructions: ', instructions);
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

    const content = await readFile(`${filePath}${fileName}`, 'utf8');
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

  private getRecipeIngredients(fileContent: string): IngredientAmount[] {
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
  private convertIngredientLine(ingredientLineRaw: string): IngredientAmount[] {
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
  private convertSingleIngredient(ingredientRaw: string): IngredientAmount {
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
      ingredientName,
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
      if (lineContent.startsWith(blockStartString)) {
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

  private getInstructions(fileContent: string): Instruction[] {
    const allInstructionLines = this.getTextBlockBeginningWith(
      'Anleitung für',
      fileContent,
    );

    const instructions: Instruction[] = [];
    for (const instructionLine of allInstructionLines) {
      const instructionId = parseInt(instructionLine.split('.')[0]);
      const instructionContentRaw = instructionLine.split('.')[1];
      const instructionContent =
        instructionContentRaw.substring(1, instructionContentRaw.length) === ' '
          ? instructionContentRaw.substring(1, instructionContentRaw.length)
          : instructionContentRaw;

      /**
       * TODO:
       * - Load utils getInstructionUtils()
       * - load instruction_ingredients getInstructionIngredients()
       *  */

      const instruction = {
        id: null,
        step: instructionId,
        content: instructionContent,
        title: '',
        utils: [], // TODO
        ingredients: [], // TODO
        recipe: null,
      };
      instructions.push(instruction);
    }
    return instructions;
  }
}
