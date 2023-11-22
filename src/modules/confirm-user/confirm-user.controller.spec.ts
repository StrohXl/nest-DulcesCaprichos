import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmUserController } from './confirm-user.controller';
import { ConfirmUserService } from './confirm-user.service';

describe('ConfirmUserController', () => {
  let controller: ConfirmUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfirmUserController],
      providers: [ConfirmUserService],
    }).compile();

    controller = module.get<ConfirmUserController>(ConfirmUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
