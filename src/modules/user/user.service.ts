import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsWhere, In, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async create(createUserDto: CreateUserDto) {
    await this.findEmail(createUserDto.email, 'create');
    const newUser = this.userRepo.create(createUserDto);
    return this.userRepo.save(newUser);
  }

  findAll(query: any) {
    const where: FindOptionsWhere<User> = {};
    if (query.email) {
      return this.userRepo.find({ select: ['email'] });
    }
    return this.userRepo.find({
      where,
      relations: ['solicitudesDeCompra.solicitud.idIngredient'],
    });
  }

  async findEmail(email: string, typeFunction: string) {
    if (typeFunction === 'create') {
      const user = await this.userRepo.findOne({ where: { email } });
      if (user) {
        throw new ConflictException('Ya existe un usuario con ese email');
      }
    }
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User #${id} is not founc`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepo.merge(user, updateUserDto);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('no se encuentra el usuario');
    }
    return this.userRepo.delete(id);
  }
}
