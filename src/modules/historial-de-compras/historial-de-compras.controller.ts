import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HistorialDeComprasService } from './historial-de-compras.service';
import { CreateHistorialDeCompraDto } from './dto/create-historial-de-compra.dto';
import { UpdateHistorialDeCompraDto } from './dto/update-historial-de-compra.dto';

@Controller('historial-de-compras')
export class HistorialDeComprasController {
  constructor(
    private readonly historialDeComprasService: HistorialDeComprasService,
  ) {}

  @Post()
  create(@Body() createHistorialDeCompraDto: CreateHistorialDeCompraDto) {
    return this.historialDeComprasService.create(createHistorialDeCompraDto);
  }

  @Get()
  findAll() {
    return this.historialDeComprasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialDeComprasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHistorialDeCompraDto: UpdateHistorialDeCompraDto,
  ) {
    return this.historialDeComprasService.update(
      +id,
      updateHistorialDeCompraDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialDeComprasService.remove(+id);
  }
}
