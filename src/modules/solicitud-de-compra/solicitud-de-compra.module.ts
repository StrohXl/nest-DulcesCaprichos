import { Module, forwardRef } from '@nestjs/common';
import { SolicitudDeCompraService } from './solicitud-de-compra.service';
import { SolicitudDeCompraController } from './solicitud-de-compra.controller';
import { SolicitudModule } from '../solicitud/solicitud.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudDeCompra } from './entities/solicitud-de-compra.entity';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SolicitudDeCompra,User]),
    forwardRef(() => SolicitudModule),
    UserModule
  ],
  controllers: [SolicitudDeCompraController],
  providers: [SolicitudDeCompraService],
  exports: [SolicitudDeCompraService],
})
export class SolicitudDeCompraModule {}
