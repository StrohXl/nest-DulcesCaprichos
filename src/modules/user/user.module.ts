import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { JwtModule } from '@nestjs/jwt';
import { Ingredient } from '../ingredients/entities/ingredient.entity';
import { IngredientUsage } from '../ingredient-usage/entities/ingredient-usage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Ingredient, IngredientUsage]),
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
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
