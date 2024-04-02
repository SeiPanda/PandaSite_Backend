import { Category } from 'src/category/entities/category.entity';
import { Difficulty } from 'src/difficulty/entities/difficulty.entity';
import { Instruction } from 'src/instruction/entities/instruction.entity';
import { TimeUnit } from 'src/time-unit/entities/timeUnit.entity';
import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Column,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ width: 5 })
  score: number;

  @Column()
  time: number;

  @ManyToOne(() => TimeUnit, (timeUnit) => timeUnit.recipes)
  @JoinColumn({ name: 'time_unit' })
  timeUnit: TimeUnit;

  @Column({
    name: 'image_path',
    nullable: true,
  })
  imagePath: string;

  @Column()
  calories: number;

  @Column()
  description: string;

  @Column()
  carbs: number;

  @Column({nullable: true,})
  fiber: number;

  @Column()
  protein: number;

  @Column({nullable: true,})
  fat: number;

  @Column({nullable: true,})
  sugar: number;

  @Column({
    width: 15,
    name: 'portion_size',
  })
  portionSize: number;

  @ManyToOne(() => Difficulty, (difficulty) => difficulty.recipes)
  @JoinColumn({ name: 'difficulty_id' })
  difficulty: Difficulty;

  @ManyToMany(() => Category, (category) => category.recipes)
  @JoinTable({
    name: 'recipe_category',
    joinColumn: {
      name: 'recipe_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];

  @OneToMany(() => Instruction, (instruction) => instruction.recipe)
  instructions: Instruction[];
}
