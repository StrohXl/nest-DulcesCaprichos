import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateIngredientDto,
  uploadImageDto,
} from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { In } from 'typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { FilesService } from '../files/files.service';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepo: Repository<Ingredient>,
    private userService: UserService,
    private filesService: FilesService,
  ) {}
  async create(body: CreateIngredientDto, image: uploadImageDto) {
    const user = await this.userService.findOne(body.idUser);
    const imageUrl = await this.filesService.uploadImage(image);
    const newIngredient = await this.ingredientRepo.create(body);
    newIngredient.user = user;
    newIngredient.imageUrl = imageUrl;
    return this.ingredientRepo.save(newIngredient);
  }

  findAll() {
    return this.ingredientRepo.find({
      relations: { solicitudes: true, user: true },
    });
  }

  async findOne(id: number) {
    const ingredient = await this.ingredientRepo.findOne({
      where: { id },
      relations: { solicitudes: true },
    });
    if (!ingredient) {
      throw new NotFoundException('Ingredient not found');
    }
    return ingredient;
  }

  async findByName(name: string) {
    const ingredient = await this.ingredientRepo.findOne({
      where: { name },
    });
    if (ingredient) {
      throw new BadRequestException('Ya existe un ingrediente con ese nombre');
    }
  }

  async findById(id: number[]) {
    const ingredients = await this.ingredientRepo.findBy({ id: In(id) });
    const idNotFound = id.filter(
      (id) => !ingredients.some((item) => item.id === id),
    );
    if (idNotFound.length == 1) {
      throw new BadRequestException(
        `El ingrediente #${idNotFound[0]} no existe`,
      );
    }
    if (idNotFound.length > 1) {
      throw new BadRequestException(
        `No existe los ingredientes #${idNotFound}`,
      );
    } else {
      return ingredients;
    }
  }

  async update(
    id: number,
    updateIngredientDto: UpdateIngredientDto,
    image: uploadImageDto,
  ) {
    const ingredient = await this.findOne(id);
    this.ingredientRepo.merge(ingredient, updateIngredientDto);
    //Comprobar si se cambio el precio del ingrediente
    if (updateIngredientDto.idUser) {
      const user = await this.userService.findOne(updateIngredientDto.idUser);
      ingredient.user = user;
    }
    if (!ingredient.imageUrl) {
      const imageUrl = await this.filesService.uploadImage(image);
      ingredient.imageUrl = imageUrl;
    } else {
      if (image) {
        const newUrl = await this.filesService.update(
          image,
          ingredient.imageUrl,
        );
        ingredient.imageUrl = newUrl;
      }
    }
    return this.ingredientRepo.save(ingredient);
  }

  async remove(id: number) {
    const ingredient = await this.findOne(id);
    if (ingredient.solicitudes.length > 0) {
      throw new BadRequestException(
        'Este Producto posee solicitudes de compra',
      );
    }
    const urlImage = ingredient.imageUrl;
    await this.ingredientRepo.delete(id);
    await this.filesService.remove(urlImage);
    return `Ingredient #${id} is Removed`;
  }
}
