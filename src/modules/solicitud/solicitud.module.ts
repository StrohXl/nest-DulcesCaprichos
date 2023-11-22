import { Module } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { SolicitudController } from './solicitud.controller';
import { IngredientsModule } from '../ingredients/ingredients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solicitud } from './entities/solicitud.entity';
import { SolicitudDeCompraModule } from '../solicitud-de-compra/solicitud-de-compra.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Solicitud]),
    IngredientsModule,SolicitudDeCompraModule],
  controllers: [SolicitudController],
  providers: [SolicitudService],
  exports: [SolicitudService]
})
export class SolicitudModule {}
