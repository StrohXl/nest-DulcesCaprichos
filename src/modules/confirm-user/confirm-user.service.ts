import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { CreateConfirmUserDto } from './dto/create-confirm-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfirmUser } from './entities/confirm-user.entity';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { customAlphabet } from 'nanoid';
import { ConfirmToken } from '../../emails/confirmToken';
import { RecoveryPassword } from '../../emails/recoveryPassword';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt'
import { ConfirmEmail } from './dto/send-email-user.dto';
import { UserService } from '../user/user.service';
import { Email } from '../user/dto/email-user.dto';

@Injectable()
export class ConfirmUserService {
  constructor(
    @InjectRepository(ConfirmUser)
    private confirmUserRepo: Repository<ConfirmUser>,
    private userService: UserService,
    private jwt: JwtService,
  ) {}

  async create(createConfirmUserDto: ConfirmEmail) {
    // Obtengo el correo del cuerpo de la solicitud
    const email = createConfirmUserDto.email;

    // Obtengo el token enviado al correo
    const token = await this.sendEmail(email, 'create');

    // Verifico si existe un usuario con ese correo y en caso de existir borrarlo
    const user = await this.confirmUserRepo.findOne({
      where: { email },
    });
    if (user) {
      await this.confirmUserRepo.delete(user.id);
    }

    // Creo al nuevo usuario por confirmar
    const newUser = this.confirmUserRepo.create(createConfirmUserDto);
    newUser.token = token;
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const create = await this.confirmUserRepo.save(newUser);
    return new HttpException(
      { message: 'Se ha enviado un email a su correo', id: create.id },
      HttpStatus.OK,
    );
  }

  async confirmToken(body: CreateConfirmUserDto) {
    const id = body.id;
    const token = body.token;
    const solicitud = await this.confirmUserRepo.findOne({
      where: { id, token },
    });
    if (!solicitud) throw new BadRequestException('Codigo invalido');
    else {
      const user = {
        firstName: solicitud.firstName,
        lastName: solicitud.lastName,
        email: solicitud.email,
        password: solicitud.password,
      };
      // Creamos el usuario al confirmar el token
      await this.userService.create(user);
      console.log('funciona');
      return {
        ...solicitud,
        message: 'Codigo confirmado',
      };
    }
  }

  async sendEmail(email: string, type: string) {
    const alphabet =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const genereateToken = customAlphabet(alphabet, 5);
    const token: string = genereateToken();
    const newToken: string[] = token.split('');
    const config = {
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: 'xaviermayora20@gmail.com',
        pass: 'mhqjwzqudhhmsdlu',
      },
    };
    const emailData = {
      from: 'contacto@carhood.co',
      to: email,
      subject: 'NestXm',
      html:
        type === 'create'
          ? ConfirmToken(
              newToken[0],
              newToken[1],
              newToken[2],
              newToken[3],
              newToken[4],
            )
          : RecoveryPassword(
              newToken[0],
              newToken[1],
              newToken[2],
              newToken[3],
              newToken[4],
            ),
    };
    const transport = nodemailer.createTransport(config);
    try {
      const res = await transport.sendMail(emailData);
      return token;
    } catch (error) {
      throw new HttpException(
        'Error de conexion',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async recoveryPassword(email: Email) {
    const res = await this.userService.findEmailOne(email.email, 'search');
    const payload: any = {sub: res.id}
    const jwt = this.jwt.sign(payload)
    const token = await this.sendEmail(res.email, 'recovery');
    return new HttpException(
      { message: 'Se ha enviado un email a su correo', token, jwt },
      HttpStatus.OK,
    );
  }

  findAll() {
    return this.confirmUserRepo.find();
  }

  async findOne(id: number) {
    const confirmUser = await this.confirmUserRepo.findOne({ where: { id } });
    console.log(confirmUser);
    if (!confirmUser) {
      throw new NotFoundException(
        `Usuario por confirmar con el id #${id} no existe`,
      );
    }
    return confirmUser;
  }

  async update(id: number) {
    const confirmUser = await this.findOne(id);
    const email = confirmUser.email;
    const token = await this.sendEmail(email,'create');
    confirmUser.token = token;
    this.confirmUserRepo.save(confirmUser);
    return new HttpException(
      { message: 'Se ha enviado un email a su correo' },
      HttpStatus.OK,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} confirmUser`;
  }
}
