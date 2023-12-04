import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsOptional,
} from 'class-validator';
export class CreateIngredientDto {
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  idUser: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  description?: string;
}
