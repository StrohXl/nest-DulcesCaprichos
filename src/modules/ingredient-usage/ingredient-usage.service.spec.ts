import { Test, TestingModule } from '@nestjs/testing';
import { IngredientUsageService } from './ingredient-usage.service';

describe('IngredientUsageService', () => {
  let service: IngredientUsageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngredientUsageService],
    }).compile();

    service = module.get<IngredientUsageService>(IngredientUsageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
