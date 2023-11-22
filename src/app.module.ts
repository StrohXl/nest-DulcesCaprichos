import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientsModule } from './modules/ingredients/ingredients.module';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from '../db/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfirmUserModule } from './modules/confirm-user/confirm-user.module';
import { LoginModule } from './modules/login/login.module';
import { IngredientUsageModule } from './modules/ingredient-usage/ingredient-usage.module';
import { HistorialDeComprasModule } from './modules/historial-de-compras/historial-de-compras.module';
import { AuthModule } from './modules/auth/auth.module';
import 'dotenv/config';
import { JwtModule } from '@nestjs/jwt';
import { SolicitudModule } from './modules/solicitud/solicitud.module';
import { SolicitudDeCompraModule } from './modules/solicitud-de-compra/solicitud-de-compra.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    IngredientsModule,
    UserModule,
    ProductModule,
    ConfirmUserModule,
    LoginModule,
    IngredientUsageModule,
    HistorialDeComprasModule,
    AuthModule,
    SolicitudModule,
    SolicitudDeCompraModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
