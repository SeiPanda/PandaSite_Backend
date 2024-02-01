import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Difficulty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 15 })
    name: string;

    @OneToMany(() => Recipe, (recipe) => recipe.difficulty)
    recipes: Recipe[];
}