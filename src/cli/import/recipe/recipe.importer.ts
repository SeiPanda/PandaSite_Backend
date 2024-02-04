import { readFile, readdir } from 'node:fs/promises';
import { Importer } from '../../abstracts/Importer.abstract';

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

    const title = await this.getTitle(filePath, fileName);
    const calories = await this.getCalories(filePath, fileName);
    const ingredientLines = await this.getIngredients(filePath, fileName);

    console.log(`Title: ${title}`);
    console.log(`Calories: ${calories} kcal`);
    console.log(ingredientLines);
  }

  async getFileContent(filePath: string, fileName: string) {
    if (!filePath || !fileName) {
      console.log('No filepath or filename provided!');
      return;
    }

    const content = await readFile(`${filePath}${fileName}`, 'utf8');
    return content;
  }

  private isLineEmpty(lineContent: string): boolean {
    return lineContent.length === 0 || !lineContent.trim();
  }

  private async getTitle(filePath: string, fileName: string): Promise<string> {
    if (!filePath || !fileName) {
      console.log('No filepath or filename provided!');
      return;
    }

    const fileContent = await this.getFileContent(filePath, fileName);

    for (const [index, lineContent] of fileContent.split(/\r?\n/).entries()) {
      if (this.isLineEmpty(lineContent)) {
        continue;
      }

      if (index === 0) {
        return lineContent;
      }
    }
    return Promise.reject();
  }

  private async getCalories(
    filePath: string,
    fileName: string,
  ): Promise<number> {
    if (!filePath || !fileName) {
      console.log('No filepath or filename provided!');
      return;
    }

    const fileContent = await this.getFileContent(filePath, fileName);

    for (const [index, lineContent] of fileContent.split(/\r?\n/).entries()) {
      if (this.isLineEmpty(lineContent)) {
        continue;
      }

      if (index === 1) {
        return parseInt(lineContent.split(' ')[0]);
      }
    }
    return Promise.reject();
  }

  private async getIngredientLines(
    filePath: string,
    fileName: string,
  ): Promise<string[]> {
    if (!filePath || !fileName) {
      console.log('No filepath or filename provided!');
      return;
    }

    const fileContent = await this.getFileContent(filePath, fileName);

    const ingredientsRange: { begin: number; end: number } = {
      begin: 0,
      end: 0,
    };

    for (const [index, lineContent] of fileContent.split(/\r?\n/).entries()) {
      if (lineContent.startsWith('Zutaten für')) {
        ingredientsRange.begin = index + 1;
      }
      if (
        this.isLineEmpty(lineContent) &&
        index >= ingredientsRange.begin &&
        ingredientsRange.begin !== 0
      ) {
        ingredientsRange.end = index - 1;
        break;
      }
    }

    return fileContent
      .split(/\r?\n/)
      .slice(ingredientsRange.begin, ingredientsRange.end + 1)
      .map((lineContent) => lineContent.substring(1)); // Remove '-' on front of line
  }

  private async getIngredients(filePath: string, fileName: string) {
    if (!filePath || !fileName) {
      console.log('No filepath or filename provided!');
      return;
    }

    const ingredientsToReturn = [];

    const ingredientLines = await this.getIngredientLines(filePath, fileName);
    for (const ingredientLine of ingredientLines) {
      ingredientsToReturn.push(ingredientLine.split('(')[0].trim());
    }
    return [...new Set(ingredientsToReturn)].filter(Boolean); // Filter duplicates
  }
}
