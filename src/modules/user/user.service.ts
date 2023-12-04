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
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    await this.findEmailOne(createUserDto.email, 'create');
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
      select: { id: true, email: true },
    });
  }

  async findEmailOne(email: string, typeFunction: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (typeFunction === 'create') {
      if (user) {
        throw new ConflictException('Ya existe un usuario con ese email');
      }
    } else {
      if (!user) {
        throw new NotFoundException('No existe un usuario con ese Email');
      }
      return user;
    }
  }

  async findEmail() {
    const users = this.userRepo.find({ select: { email: true } });
    return users;
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: { ingredients: true, solicitudesDeCompra: true },
    });
    if (!user) {
      throw new NotFoundException(`User #${id} is not founc`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepo.merge(user, updateUserDto);
    user.password = await bcrypt.hash(user.password, 10);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('no se encuentra el usuario');
    }
    return this.userRepo.delete(id);
  }

  //Ingredients User

  async findIngredientsUser(id: number) {
    const user = await this.findOne(id);
    return user.ingredients;
  }
  //Ingredients User

  async findSolicitudesUser(id: number) {
    const user = await this.findOne(id);
    return user.solicitudesDeCompra;
  }
}
