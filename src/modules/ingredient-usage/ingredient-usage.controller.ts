import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IngredientUsageService } from './ingredient-usage.service';
import { CreateIngredientUsageDto } from './dto/create-ingredient-usage.dto';
import { UpdateIngredientUsageDto } from './dto/update-ingredient-usage.dto';
import { AuthGuard } from '../auth/guards/jwt.guard';

@UseGuards(AuthGuard)
@Controller('ingredient-usage')
export class IngredientUsageController {
  constructor(
    private readonly ingredientUsageService: IngredientUsageService,
  ) {}

  @Post()
  create(@Body() createIngredientUsageDto: CreateIngredientUsageDto) {
    return this.ingredientUsageService.create(createIngredientUsageDto);
  }

  @Get()
  findAll() {
    return this.ingredientUsageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingredientUsageService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIngredientUsageDto: UpdateIngredientUsageDto,
  ) {
    return this.ingredientUsageService.update(+id, updateIngredientUsageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingredientUsageService.remove(+id);
  }
}
