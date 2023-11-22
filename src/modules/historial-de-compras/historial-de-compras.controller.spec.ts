import { Test, TestingModule } from '@nestjs/testing';
import { HistorialDeComprasController } from './historial-de-compras.controller';
import { HistorialDeComprasService } from './historial-de-compras.service';

describe('HistorialDeComprasController', () => {
  let controller: HistorialDeComprasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorialDeComprasController],
      providers: [HistorialDeComprasService],
    }).compile();

    controller = module.get<HistorialDeComprasController>(HistorialDeComprasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
