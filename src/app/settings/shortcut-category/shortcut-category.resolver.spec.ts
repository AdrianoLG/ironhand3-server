import { Test, TestingModule } from '@nestjs/testing'

import { ShortcutCategoryResolver } from './shortcut-category.resolver'
import { ShortcutCategoryService } from './shortcut-category.service'

describe('ShortcutCategoryResolver', () => {
  let resolver: ShortcutCategoryResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortcutCategoryResolver, ShortcutCategoryService]
    }).compile()

    resolver = module.get<ShortcutCategoryResolver>(ShortcutCategoryResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
