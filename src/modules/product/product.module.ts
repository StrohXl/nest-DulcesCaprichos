import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { IngredientsService } from '../ingredients/ingredients.service';
import { IngredientUsage } from '../ingredient-usage/entities/ingredient-usage.entity';
import { IngredientUsageService } from '../ingredient-usage/ingredient-usage.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Ingredient, IngredientUsage]),
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
    UserModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, IngredientsService, IngredientUsageService],
  exports: [ProductService],
})
export class ProductModule {}
