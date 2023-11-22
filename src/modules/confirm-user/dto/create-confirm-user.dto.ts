import {IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConfirmUserDto {
  @IsNumber()
  @IsNotEmpty()
  id?: number;

  @IsString()
  @IsNotEmpty()
  token?: string;
}
