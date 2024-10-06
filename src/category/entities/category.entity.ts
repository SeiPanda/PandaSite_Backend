import { CategoryGroup } from 'src/category-group/entities/category-group.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => Recipe, (recipe) => recipe.categories)
  @JoinTable({
    name: 'recipe_category',
    joinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'recipe_id',
      referencedColumnName: 'id',
    },
  })
  recipes: Recipe[];

  @ManyToOne(() => CategoryGroup, (group) => group.categories, { eager: true })
  group: CategoryGroup;
}
