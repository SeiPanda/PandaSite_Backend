import { Recipe } from "src/recipe/entities/recipe.entity";
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50})
    name: string;

    @OneToMany(() => Recipe, (recipe) => recipe.categories)
    @JoinTable({ 
        name: 'Recipe_Category', 
        synchronize: false,
        joinColumn: {
            name: 'category_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'recipe_id',
            referencedColumnName: 'id'
        }
    })
    recipes: Recipe[];
}