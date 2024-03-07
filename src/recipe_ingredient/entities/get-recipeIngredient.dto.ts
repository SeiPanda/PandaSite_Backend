import { AmountUnit } from "src/amount-unit/entities/amountUnit.entity";
import { Ingredient } from "src/ingredient/entities/ingredient.entity";

export class GetRecipeIngredientDTO {
    ingredient: Ingredient;
    amount: number;
    amountUnit: AmountUnit;
}