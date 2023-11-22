import { Test, TestingModule } from '@nestjs/testing';
import { HistorialDeComprasService } from './historial-de-compras.service';

describe('HistorialDeComprasService', () => {
  let service: HistorialDeComprasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorialDeComprasService],
    }).compile();

    service = module.get<HistorialDeComprasService>(HistorialDeComprasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
