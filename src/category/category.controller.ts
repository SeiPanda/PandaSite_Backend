import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO } from './entities/category.dto';
import { mapCategroyToDTO } from 'src/mappers/category.mapper';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<CategoryDTO[]> {
    const allCategories = await this.categoryService.getCategories();
    const categoriesToReturn: CategoryDTO[] = [];
    for (const cate of allCategories) {
      categoriesToReturn.push(mapCategroyToDTO(cate));
    }
    return categoriesToReturn;
  }


}
