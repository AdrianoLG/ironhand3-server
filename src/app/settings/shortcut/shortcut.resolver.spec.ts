import { Test, TestingModule } from '@nestjs/testing'

import { ShortcutResolver } from './shortcut.resolver'
import { ShortcutService } from './shortcut.service'

describe('ShortcutResolver', () => {
  let resolver: ShortcutResolver

  let service: ShortcutService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortcutResolver,
        {
          provide: ShortcutService,
          useValue: {
            createShortcut: jest.fn(),
            findAllShortcuts: jest.fn(),
            getShortcutById: jest.fn(),
            updateShortcut: jest.fn(),
            removeShortcut: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<ShortcutResolver>(ShortcutResolver)
    service = module.get<ShortcutService>(ShortcutService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('findAll should return from service', async () => {
    const shortcuts = [{ _id: '1', name: 'A' }] as any
    ;(service.findAllShortcuts as jest.Mock).mockResolvedValue(shortcuts)
    const result = await resolver.findAll()
    expect(result).toEqual(shortcuts)
    expect(service.findAllShortcuts).toHaveBeenCalled()
  })

  it('findOne should delegate', async () => {
    const shortcut = { _id: 's1', name: 'B' } as any
    ;(service.getShortcutById as jest.Mock).mockResolvedValue(shortcut)
    const result = await resolver.findOne('s1' as any)
    expect(result).toEqual(shortcut)
    expect(service.getShortcutById).toHaveBeenCalledWith('s1')
  })

  it('createShortcut should delegate', async () => {
    const input = { name: 'New' } as any
    const created = { _id: 'n1', ...input } as any
    ;(service.createShortcut as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createShortcut(input)
    expect(result).toEqual(created)
    expect(service.createShortcut).toHaveBeenCalledWith(input)
  })

  it('updateShortcut should delegate', async () => {
    const update = { _id: 'u1', name: 'Upd' } as any
    const updated = { _id: 'u1', name: 'Upd' } as any
    ;(service.updateShortcut as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateShortcut(update)
    expect(result).toEqual(updated)
    expect(service.updateShortcut).toHaveBeenCalledWith('u1', update)
  })

  it('removeShortcut should map ResponseType', async () => {
    ;(service.removeShortcut as jest.Mock).mockResolvedValue({
      deletedCount: 2
    })
    const result = await resolver.removeShortcut('r1' as any)
    expect(result).toEqual({
      message: 'Shortcut removed successfully',
      count: 2
    })
    expect(service.removeShortcut).toHaveBeenCalledWith('r1')
  })
})
