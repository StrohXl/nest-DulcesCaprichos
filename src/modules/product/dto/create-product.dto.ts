import { Type } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsNumber,
  ArrayNotEmpty,
  ValidateNested,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  stock: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientsQuantity)
  ingredients: IngredientsQuantity[];
}
export class IngredientsQuantity {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  ingredient: number;
}
