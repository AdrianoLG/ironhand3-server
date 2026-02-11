import { Test, TestingModule } from '@nestjs/testing'

import { SheetResolver } from './sheet.resolver'
import { SheetService } from './sheet.service'

describe('SheetResolver', () => {
  let resolver: SheetResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SheetResolver, SheetService]
    }).compile()

    resolver = module.get<SheetResolver>(SheetResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
