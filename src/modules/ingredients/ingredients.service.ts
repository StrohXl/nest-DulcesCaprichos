import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { In } from 'typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepo: Repository<Ingredient>,
  ) {}
  async create(createIngredientDto: CreateIngredientDto) {
    await this.findByName(createIngredientDto.name);
    const newIngredient = await this.ingredientRepo.create(createIngredientDto);
    return this.ingredientRepo.save(newIngredient);
  }

  findAll() {
    return this.ingredientRepo.find({ relations: { solicitudes: true } });
  }

  async findOne(id: number) {
    const ingredient = await this.ingredientRepo.findOne({ where: { id } });
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

  async update(id: number, updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.findOne(id);
    this.ingredientRepo.merge(ingredient, updateIngredientDto);
    //Comprobar si se cambio el precio del ingrediente
    if (updateIngredientDto.price) {
      return ingredient;
    }
    return this.ingredientRepo.save(ingredient);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.ingredientRepo.delete(id);
  }
}
