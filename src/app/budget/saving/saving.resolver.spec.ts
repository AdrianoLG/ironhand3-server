import { Test, TestingModule } from '@nestjs/testing'

import { SavingResolver } from './saving.resolver'
import { SavingService } from './saving.service'

describe('SavingResolver', () => {
  let resolver: SavingResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavingResolver, SavingService]
    }).compile()

    resolver = module.get<SavingResolver>(SavingResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
