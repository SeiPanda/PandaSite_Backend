import { Command, CommandRunner } from 'nest-commander';
import { RecipeImporter } from '../import/recipe/recipe.importer';

@Command({ name: 'import', description: 'Imports files' })
export class ImportCommand extends CommandRunner {
  async run(passedParams: string[]): Promise<void> {
    /* Importing recipes */
    if (passedParams.includes('recipes'.toLowerCase())) {
      const recipeImporter = new RecipeImporter('imports/recipes/');
      await recipeImporter.import();
    }
  }
}
