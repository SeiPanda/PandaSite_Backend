import { AmountUnit } from 'src/amount-unit/entities/amountUnit.entity';
import { Ingredient } from 'src/ingredient/entities/ingredient.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class RecipeIngredient {
  @PrimaryColumn({ name: 'recipe_id', type: 'int' })
  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  @JoinColumn({ name: 'recipe_id' })
  recipe: Recipe;

  @PrimaryColumn({ name: 'ingredient_id', type: 'int' })
  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeIngredients)
  @JoinColumn({ name: 'ingredient_id' })
  ingredient: Ingredient;

  @Column()
  amount: number;

  @ManyToOne(() => AmountUnit, (amountUnit) => amountUnit.recipeIngredients)
  @JoinColumn({ name: 'amount_unit' })
  amountUnit: AmountUnit;
}
