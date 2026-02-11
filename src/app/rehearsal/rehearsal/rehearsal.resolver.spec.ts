import { Test, TestingModule } from '@nestjs/testing';
import { RehearsalResolver } from './rehearsal.resolver';
import { RehearsalService } from './rehearsal.service';

describe('RehearsalResolver', () => {
  let resolver: RehearsalResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RehearsalResolver, RehearsalService],
    }).compile();

    resolver = module.get<RehearsalResolver>(RehearsalResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
