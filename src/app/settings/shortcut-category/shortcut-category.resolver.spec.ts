import { Test, TestingModule } from '@nestjs/testing'

import { ShortcutCategoryResolver } from './shortcut-category.resolver'
import { ShortcutCategoryService } from './shortcut-category.service'

describe('ShortcutCategoryResolver', () => {
  let resolver: ShortcutCategoryResolver

  let service: ShortcutCategoryService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShortcutCategoryResolver,
        {
          provide: ShortcutCategoryService,
          useValue: {
            createShortcutCategory: jest.fn(),
            findAllShortcutCategories: jest.fn(),
            getShortcutCategoryById: jest.fn(),
            updateShortcutCategoryInput: jest.fn(),
            removeShortcutCategory: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<ShortcutCategoryResolver>(ShortcutCategoryResolver)
    service = module.get<ShortcutCategoryService>(ShortcutCategoryService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('findAll should return from service', async () => {
    const items = [{ _id: 'sc1' }] as any
    ;(service.findAllShortcutCategories as jest.Mock).mockResolvedValue(items)
    const result = await resolver.findAllShortcutCategories()
    expect(result).toEqual(items)
    expect(service.findAllShortcutCategories).toHaveBeenCalled()
  })

  it('get by id should delegate', async () => {
    const item = { _id: 'scx' } as any
    ;(service.getShortcutCategoryById as jest.Mock).mockResolvedValue(item)
    const result = await resolver.getShortcutCategoryById('scx' as any)
    expect(result).toEqual(item)
    expect(service.getShortcutCategoryById).toHaveBeenCalledWith('scx')
  })

  it('create should delegate', async () => {
    const input = { name: 'New' } as any
    const created = { _id: 'n1', ...input } as any
    ;(service.createShortcutCategory as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createShortcutCategory(input)
    expect(result).toEqual(created)
    expect(service.createShortcutCategory).toHaveBeenCalledWith(input)
  })

  it('update should delegate', async () => {
    const update = { _id: 'u1', name: 'Upd' } as any
    const updated = { _id: 'u1', name: 'Upd' } as any
    ;(service.updateShortcutCategoryInput as jest.Mock).mockResolvedValue(
      updated
    )
    const result = await resolver.updateShortcutCategory(update)
    expect(result).toEqual(updated)
    expect(service.updateShortcutCategoryInput).toHaveBeenCalledWith(
      'u1',
      update
    )
  })

  it('remove should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeShortcutCategory as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeShortcutCategory('r1' as any)
    expect(result).toEqual(removed)
    expect(service.removeShortcutCategory).toHaveBeenCalledWith('r1')
  })
})
