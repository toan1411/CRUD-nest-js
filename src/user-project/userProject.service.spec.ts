import { Test, TestingModule } from '@nestjs/testing';
import { UserProjectService } from './userProject.service';

describe('UserProjectService', () => {
  let service: UserProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserProjectService],
    }).compile();

    service = module.get<UserProjectService>(UserProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
