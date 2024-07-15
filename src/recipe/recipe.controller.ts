import { Body, Controller, Get, Param, Post} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeThinDTO } from './entities/recipe.dto';
import { mapRecipeToDTO } from 'src/mappers/recipe.mapper';
import { mapRecipeThinToDTO } from 'src/mappers/recipeThin.mapper';
import { CreateRecipeDto } from './entities/createRecipe.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { mapRecipeSearchOptionsDTO } from 'src/mappers/searchRecipes.mapper';
import { SearchOptionsDTO } from './entities/searchOptions.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @FormDataRequest()
  create(
    @Body() createRecipeDto: CreateRecipeDto) {
    console.log(createRecipeDto);
    return this.recipeService.create(createRecipeDto);
  }

  @Get()
  async findAll(): Promise<RecipeThinDTO[]> {
    const allRecipes = await this.recipeService.getRecipes();
    const recipesToReturn: RecipeThinDTO[] = [];
    for (const recipe of allRecipes) {
      recipesToReturn.push(mapRecipeThinToDTO(recipe));
    }
    return recipesToReturn;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const recipe = await this.recipeService.getRecipeById(+id);
    return mapRecipeToDTO(recipe);
  }

  /*   @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  } */

  @Get('search/:searchText')
  async findOccurences(@Param('searchText') searchText: string) {
    console.error(searchText)
    const filteredRecipes = await this.recipeService.getOccurences(searchText);
    const titles: SearchOptionsDTO[] = [];
    for (const recipe of filteredRecipes) {
      titles.push(mapRecipeSearchOptionsDTO(recipe));
    }
    return titles;
  }
}
