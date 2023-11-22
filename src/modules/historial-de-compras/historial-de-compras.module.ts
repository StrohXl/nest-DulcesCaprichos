import { Module } from '@nestjs/common';
import { HistorialDeComprasService } from './historial-de-compras.service';
import { HistorialDeComprasController } from './historial-de-compras.controller';

@Module({
  controllers: [HistorialDeComprasController],
  providers: [HistorialDeComprasService],
})
export class HistorialDeComprasModule {}
