import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  ValidateNested,
} from 'class-validator';
import { CreateSolicitudDto } from '../../solicitud/dto/create-solicitud.dto';

export class CreateSolicitudDeCompraDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  user: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSolicitudDto)
  solicitudes: CreateSolicitudDto[];
}
