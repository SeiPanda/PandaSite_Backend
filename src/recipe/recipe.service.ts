import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipeService {

  findAll() {
    return `This action returns all recipe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }
}
