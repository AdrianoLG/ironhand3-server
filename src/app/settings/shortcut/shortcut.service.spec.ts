import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { ShortcutService } from './shortcut.service'

describe('ShortcutService', () => {
  let service: ShortcutService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortcutService,
        { provide: getModelToken('Shortcut'), useValue: {} },
        { provide: getModelToken('ShortcutCategory'), useValue: {} }
      ]
    }).compile()

    service = module.get<ShortcutService>(ShortcutService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
