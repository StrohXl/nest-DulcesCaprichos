import { Module } from '@nestjs/common';
import { ConfirmUserService } from './confirm-user.service';
import { ConfirmUserController } from './confirm-user.controller';
import { ConfirmUser } from './entities/confirm-user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConfirmUser, User]), UserModule],
  controllers: [ConfirmUserController],
  providers: [ConfirmUserService, UserService],
})
export class ConfirmUserModule {}
