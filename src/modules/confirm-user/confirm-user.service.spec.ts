import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmUserService } from './confirm-user.service';

describe('ConfirmUserService', () => {
  let service: ConfirmUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfirmUserService],
    }).compile();

    service = module.get<ConfirmUserService>(ConfirmUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
