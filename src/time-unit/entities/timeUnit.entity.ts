import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TimeUnit {

    @PrimaryColumn({ length: 3 })
    id: string;

    @Column({ length: 50 })
    name: string;

    @OneToMany(() => Recipe, (recipe) => recipe.timeUnit)
    recipes: Recipe[];
}