import { TimeUnitDTO } from "src/time-unit/entities/timeUnit.dto";
import { TimeUnit } from "src/time-unit/entities/timeUnit.entity";

function mapTimeUnitToDTO(unit: TimeUnit): TimeUnitDTO {
  return {
    id: unit.id,
    name: unit.name
  };
}

export { mapTimeUnitToDTO };
