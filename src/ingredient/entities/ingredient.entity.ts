import { InstructionIngredient } from 'src/instruction_ingredient/entities/instructionIngredient.entity';
import { RecipeIngredient } from 'src/recipe_ingredient/entities/recipeIngredient.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => InstructionIngredient,
    (instructionIngredient) => instructionIngredient.ingredient,
  )
  @JoinTable({ name: 'instruction_ingredient' })
  instructionIngredients?: InstructionIngredient[];

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.ingredient,
  )
  @JoinTable({ name: 'recipe_ingredient' })
  recipeIngredients?: RecipeIngredient[];
}
