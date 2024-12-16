import { Test, TestingModule } from '@nestjs/testing'

import { ShortcutsResolver } from './shortcut.resolver'
import { ShortcutsService } from './shortcut.service'

describe('ShortcutsResolver', () => {
  let resolver: ShortcutsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortcutsResolver, ShortcutsService]
    }).compile()

    resolver = module.get<ShortcutsResolver>(ShortcutsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
