import { AmountUnitDTO } from "src/amount-unit/entities/amountUnit.dto";

export class IngredientDTO {
  singleName: string;
  pluralName: string;
  amount: number;
  unit: AmountUnitDTO;
}
