import { Module } from '@nestjs/common';
import { ConfirmUserService } from './confirm-user.service';
import { ConfirmUserController } from './confirm-user.controller';
import { ConfirmUser } from './entities/confirm-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import 'dotenv/config';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    TypeOrmModule.forFeature([ConfirmUser, User]),
    UserModule,
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
  controllers: [ConfirmUserController],
  providers: [ConfirmUserService, UserService],
})
export class ConfirmUserModule {}
