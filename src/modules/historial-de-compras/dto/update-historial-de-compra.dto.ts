import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialDeCompraDto } from './create-historial-de-compra.dto';

export class UpdateHistorialDeCompraDto extends PartialType(CreateHistorialDeCompraDto) {}
