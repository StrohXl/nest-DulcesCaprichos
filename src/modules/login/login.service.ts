import {
  Injectable,
  NotFoundException,
  HttpException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    private jwt: JwtService,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}
  async login(user: LoginDto) {
    const userLogin = await this.findUser(user);
    const payload: any = { sub: userLogin.id };
    const token = this.jwt.sign(payload);
    return new HttpException(
      { token, message: 'Usuario conectado' },
      HttpStatus.OK,
    );
  }
  async findUser(user: LoginDto) {
    const { email, password } = user;
    const findUser = await this.userRepo.findOne({
      where: { email },
    });
    if (!findUser) {
      throw new NotFoundException('Correo o Contrasena incorrecta');
    } else {
      const isMatch = await bcrypt.compare(password, findUser.password);
      if (!isMatch) {
        throw new BadRequestException('Correo o Contrasena incorrecta');
      }
      return findUser;
    }
  }
}
