import { AmountUnitDTO } from 'src/amount-unit/entities/amountUnit.dto';
import { AmountUnit } from 'src/amount-unit/entities/amountUnit.entity';

function mapAmountUnitToDTO(unit: AmountUnit): AmountUnitDTO {
  return {
    id: unit.id,
    name: unit.name,
  };
}

export { mapAmountUnitToDTO };
