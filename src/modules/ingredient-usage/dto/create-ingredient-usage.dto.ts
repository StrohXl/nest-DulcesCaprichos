import { IsNumber, IsPositive, IsNotEmpty } from 'class-validator';
export class CreateIngredientUsageDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  ingredient: number;
}
