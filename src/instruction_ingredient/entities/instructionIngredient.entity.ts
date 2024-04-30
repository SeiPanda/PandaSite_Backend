import { AmountUnit } from 'src/amount-unit/entities/amountUnit.entity';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { Instruction } from 'src/instruction/entities/instruction.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class InstructionIngredient {
  @PrimaryColumn({ name: 'instruction_id' })
  instructionId: number;

  @PrimaryColumn({ name: 'ingredient_id' })
  ingredientId: number;

  //@PrimaryColumn({ name: 'instruction_id', type: 'int' })
  @ManyToOne(() => Instruction, (instruction) => instruction.ingredients)
  @JoinColumn({ name: 'instruction_id' })
  instruction: Instruction;

  //@PrimaryColumn({ name: 'ingredient_id', type: 'int' })
  @ManyToOne(
    () => Ingredient,
    (ingredient) => ingredient.instructionIngredients,
  )
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;

  @Column()
  amount: number;

  @ManyToOne(
    () => AmountUnit,
    (amountUnit) => amountUnit.instructionIngredients,
  )
  @JoinColumn({ name: 'amount_unit' })
  amountUnit: AmountUnit;
}
