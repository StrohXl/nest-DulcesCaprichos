import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIngredientUsageDto } from './dto/create-ingredient-usage.dto';
import { UpdateIngredientUsageDto } from './dto/update-ingredient-usage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientUsage } from './entities/ingredient-usage.entity';
import { Repository } from 'typeorm';
import { IngredientsService } from '../ingredients/ingredients.service';
import { Ingredient } from '../ingredients/entities/ingredient.entity';

@Injectable()
export class IngredientUsageService {
  constructor(
    @InjectRepository(IngredientUsage)
    private iuRepo: Repository<IngredientUsage>,
    private ingredientService: IngredientsService,
  ) {}
  async create(createIngredientUsageDto: CreateIngredientUsageDto) {
    const { quantity } = createIngredientUsageDto;
    const ingredientFind = await this.ingredientService.findOne(
      createIngredientUsageDto.ingredient,
    );
    const newIngredientUsage = this.iuRepo.create({
      ingredient: ingredientFind,
      quantity,
    });
    return this.iuRepo.save(newIngredientUsage);
  }

  findAll() {
    return this.iuRepo.find();
  }

  async findOne(id: number) {
    const iu = await this.iuRepo.findOne({ where: { id } });
    if (!iu) {
      throw new NotFoundException(`Ingredient usage #${id} not found`);
    }
    return iu;
  }

  async update(id: number, updateIngredientUsageDto: UpdateIngredientUsageDto) {
    const ingredientUsage = await this.findOne(id);
    this.iuRepo.merge(ingredientUsage, updateIngredientUsageDto);
    ingredientUsage.ingredient = await this.ingredientService.findOne(
      updateIngredientUsageDto.ingredient,
    );
    return this.iuRepo.save(ingredientUsage);
  }

  async remove(id: number) {
    await this.findOne(id);
    this.iuRepo.delete(id);
    return `This action removes a #${id} ingredientUsage`;
  }
}
