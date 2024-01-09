import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  IsDefined,
} from 'class-validator';
import { Multer } from 'multer';
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

export class uploadImageDto {
  @IsDefined()
  @IsNotEmpty()
  image: Multer.File;
}
