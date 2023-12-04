import { Module } from '@nestjs/common';
import { IngredientUsageService } from './ingredient-usage.service';
import { IngredientUsageController } from './ingredient-usage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientUsage } from './entities/ingredient-usage.entity';
import { IngredientsService } from '../ingredients/ingredients.service';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { Product } from '../product/entities/product.entity';
import { JwtModule } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([IngredientUsage, Ingredient, Product]),
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
  controllers: [IngredientUsageController],
  providers: [IngredientUsageService, IngredientsService],
  exports: [IngredientUsageService],
})
export class IngredientUsageModule {}
