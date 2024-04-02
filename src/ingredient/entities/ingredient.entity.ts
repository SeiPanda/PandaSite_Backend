import { InstructionIngredient } from 'src/instruction_ingredient/entities/instructionIngredient.entity';
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

  @Column({ name: 'single_name' })
  singleName: string;

  @Column({ name: 'plural_name' })
  pluralName: string;

  @OneToMany(
    () => InstructionIngredient,
    (instructionIngredient) => instructionIngredient.ingredient,
  )
  @JoinTable({ name: 'instruction_ingredient' })
  instructionIngredients?: InstructionIngredient[];
}
