import { InstructionIngredient } from "src/instruction_ingredient/entities/instructionIngredient.entity";
import { Recipe } from "src/recipe/entities/recipe.entity";
import { Util } from "src/util/entities/util.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Instruction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    step: number;

    @Column()
    content: string;

    @Column({ length: 50 })
    title: string;

    @ManyToMany(() => Util, (util) => util.instructions)
    @JoinTable({ name: 'Instruction_Util', joinColumn: {
        name: 'instruction_id',
        referencedColumnName: 'id'
    },
    inverseJoinColumn: {
        name: 'util_id',
        referencedColumnName: 'id'
    }})
    utils: Util[];

    @OneToMany(() => InstructionIngredient, (instructionIngredient) => instructionIngredient.instruction)
    @JoinTable({ name: 'Instruction_Ingredient' })
    instructionIngredients: InstructionIngredient[];

    @ManyToOne(() => Recipe, (recipe) => recipe.instructions)
    @JoinColumn({ name: 'recipe_id' })
    recipe: Recipe;
}