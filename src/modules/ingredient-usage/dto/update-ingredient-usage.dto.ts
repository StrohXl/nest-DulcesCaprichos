import { PartialType } from '@nestjs/mapped-types';
import { CreateIngredientUsageDto } from './create-ingredient-usage.dto';

export class UpdateIngredientUsageDto extends PartialType(
  CreateIngredientUsageDto,
) {}
