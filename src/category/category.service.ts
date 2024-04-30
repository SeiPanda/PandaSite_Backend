import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDTO } from './entities/category.dto';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findOrCreate(categoryDTO: CategoryDTO): Promise<Category> {
    let category = await this.categoryRepository.findOne({
      where: {
        name: ILike(`${categoryDTO.name}`),
      },
    });

    if (!category) {
      category = this.categoryRepository.create({
        name: categoryDTO.name,
      });
      this.categoryRepository.save(category);
    }

    return category;
  }
}
