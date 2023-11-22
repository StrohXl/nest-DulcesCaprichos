import { Test, TestingModule } from '@nestjs/testing';
import { IngredientUsageController } from './ingredient-usage.controller';
import { IngredientUsageService } from './ingredient-usage.service';

describe('IngredientUsageController', () => {
  let controller: IngredientUsageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientUsageController],
      providers: [IngredientUsageService],
    }).compile();

    controller = module.get<IngredientUsageController>(IngredientUsageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
