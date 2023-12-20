import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Product } from '../product/entities/product.entity';
import { ProductService } from '../product/product.service';
import { IngredientUsageModule } from '../ingredient-usage/ingredient-usage.module';
import { IngredientUsage } from '../ingredient-usage/entities/ingredient-usage.entity';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef } from '@nestjs/common/utils';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ingredient, Product, IngredientUsage, User]),
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.SECRET_JWT,
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
    IngredientUsageModule,
    UserModule,
    FilesModule,
  ],
  controllers: [IngredientsController],
  providers: [IngredientsService, ProductService, UserService],
  exports: [IngredientsService],
})
export class IngredientsModule {}
