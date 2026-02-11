import { Test, TestingModule } from '@nestjs/testing';
import { InstrumentResolver } from './instrument.resolver';
import { InstrumentService } from './instrument.service';

describe('InstrumentResolver', () => {
  let resolver: InstrumentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InstrumentResolver, InstrumentService],
    }).compile();

    resolver = module.get<InstrumentResolver>(InstrumentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
