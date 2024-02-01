import { InstructionIngredient } from "src/instruction_ingredient/entities/instructionIngredient.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class AmountUnit {
    @PrimaryColumn({ length: 2 })
    id: string;

    @Column({ length: 25 })
    name: string;

    @OneToMany(() => InstructionIngredient, (instructionIngredient) => instructionIngredient.amountUnit)
    instructionIngredients: InstructionIngredient[];
}