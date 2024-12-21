import { Test, TestingModule } from '@nestjs/testing';
import { HeaderResolver } from './header.resolver';
import { HeaderService } from './header.service';

describe('HeaderResolver', () => {
  let resolver: HeaderResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeaderResolver, HeaderService],
    }).compile();

    resolver = module.get<HeaderResolver>(HeaderResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
