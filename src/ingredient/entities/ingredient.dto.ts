import { AmountUnitDTO } from "src/amount-unit/entities/amountUnit.dto";

export class IngredientDTO {
  name: string;
  amount: number;
  unit: AmountUnitDTO;
}
