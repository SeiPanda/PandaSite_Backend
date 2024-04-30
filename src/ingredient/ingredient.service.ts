import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { IngredientDTO } from './entities/ingredient.dto';
import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async findOrCreate(ingredientDTO: IngredientDTO): Promise<Ingredient> {
    let ingredient = await this.ingredientRepository.findOne({
      where: {
        singleName: ILike(`${ingredientDTO.singleName}`),
        pluralName: ILike(`${ingredientDTO.pluralName}`),
      },
    });

    if (!ingredient) {
      ingredient = this.ingredientRepository.create({
        singleName: ingredientDTO.singleName,
        pluralName: ingredientDTO.pluralName,
      });
      ingredient = await this.ingredientRepository.save(ingredient);
    }

    return ingredient;
  }
}
