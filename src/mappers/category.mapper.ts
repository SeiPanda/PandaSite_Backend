import { CategoryDTO } from 'src/category/entities/category.dto';
import { Category } from 'src/category/entities/category.entity';

function mapCategroyToDTO(category: Category): CategoryDTO {
  return {
    name: category.name,
    group: category.group?.id,
  };
}

export { mapCategroyToDTO };
