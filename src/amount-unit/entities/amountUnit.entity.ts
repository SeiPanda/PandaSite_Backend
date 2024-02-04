import { InstructionIngredient } from 'src/instruction_ingredient/entities/instructionIngredient.entity';
import { RecipeIngredient } from 'src/recipe_ingredient/entities/recipeIngredient.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class AmountUnit {
  @PrimaryColumn({ length: 2 })
  id: string;

  @Column({ length: 25 })
  name: string;

  @OneToMany(
    () => InstructionIngredient,
    (instructionIngredient) => instructionIngredient.amountUnit,
  )
  instructionIngredients: InstructionIngredient[];

  @OneToMany(
    () => RecipeIngredient,
    (recipeIngredient) => recipeIngredient.amountUnit,
  )
  recipeIngredients: RecipeIngredient[];
}
