import { Injectable } from '@nestjs/common';
import { CreateHistorialDeCompraDto } from './dto/create-historial-de-compra.dto';
import { UpdateHistorialDeCompraDto } from './dto/update-historial-de-compra.dto';

@Injectable()
export class HistorialDeComprasService {
  create(createHistorialDeCompraDto: CreateHistorialDeCompraDto) {
    return 'This action adds a new historialDeCompra';
  }

  findAll() {
    return `This action returns all historialDeCompras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historialDeCompra`;
  }

  update(id: number, updateHistorialDeCompraDto: UpdateHistorialDeCompraDto) {
    return `This action updates a #${id} historialDeCompra`;
  }

  remove(id: number) {
    return `This action removes a #${id} historialDeCompra`;
  }
}
