import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { ShortcutCategoryService } from './shortcut-category.service'

describe('ShortcutCategoryService', () => {
  let service: ShortcutCategoryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortcutCategoryService,
        { provide: getModelToken('ShortcutCategory'), useValue: {} },
        { provide: getModelToken('Shortcut'), useValue: {} }
      ]
    }).compile()

    service = module.get<ShortcutCategoryService>(ShortcutCategoryService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
