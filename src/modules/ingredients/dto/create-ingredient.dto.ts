import { IsString, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
export class CreateIngredientDto {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  idUser: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}
