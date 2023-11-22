import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
export class CreateIngredientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
