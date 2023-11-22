import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateSolicitudDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  idIngredient: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  quantity: number;
}
