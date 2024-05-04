import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeThinDTO } from './entities/recipe.dto';
import { mapRecipeToDTO } from 'src/mappers/recipe.mapper';
import { mapRecipeThinToDTO } from 'src/mappers/recipeThin.mapper';
import { CreateRecipeDto } from './entities/createRecipe.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
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

  @Post(':id/image')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(@UploadedFile() image: Express.Multer.File) {
    console.log(image);
  }

  /*   @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  } */
}
