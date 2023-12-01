import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import {
  CreateProductDto,
  IngredientsQuantity,
} from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { In } from 'typeorm';
import { IngredientUsageService } from '../ingredient-usage/ingredient-usage.service';
import { IngredientUsage } from '../ingredient-usage/entities/ingredient-usage.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private iuService: IngredientUsageService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepo.create(createProductDto);
    const { ingredients } = createProductDto;
    const receta = await this.createReceta(ingredients);
    const price = await this.createPrice(receta);
    newProduct.price = price;
    newProduct.receta = receta;
    return this.productRepo.save(newProduct);
  }

  async createReceta(ingredients: IngredientsQuantity[]) {
    const promises = ingredients.map(async (item, index) => {
      return await this.iuService.create(ingredients[index]);
    });
    return await Promise.all(promises);
  }

  async createPrice(receta: IngredientUsage[]) {
    let price = 0;
    receta.forEach((i) => {
      price += i.quantity * i.ingredient.price;
    });
    return price;
  }

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async remove(id: number) {
    await this.findOne(id);
    this.productRepo.delete(id);
    return `This action removes a #${id} product`;
  }
  async update(id: number, body: UpdateProductDto) {
    return 'actualizado';
  }
}
