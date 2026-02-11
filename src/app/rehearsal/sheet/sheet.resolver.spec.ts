import { Test, TestingModule } from '@nestjs/testing'

import { SheetResolver } from './sheet.resolver'
import { SheetService } from './sheet.service'

describe('SheetResolver', () => {
  let resolver: SheetResolver

  let service: SheetService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SheetResolver,
        {
          provide: SheetService,
          useValue: {
            createSheet: jest.fn(),
            findAllSheets: jest.fn(),
            getSheetById: jest.fn(),
            updateSheet: jest.fn(),
            removeSheet: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<SheetResolver>(SheetResolver)
    service = module.get<SheetService>(SheetService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('findAll should return list from service', async () => {
    const sheets = [
      { _id: '1', title: 'A', duration: 120 },
      { _id: '2', title: 'B', duration: 90 }
    ] as any
    ;(service.findAllSheets as jest.Mock).mockResolvedValue(sheets)
    const result = await resolver.findAll()
    expect(result).toEqual(sheets)
    expect(service.findAllSheets).toHaveBeenCalled()
  })

  it('findOne should fetch by id', async () => {
    const sheet = { _id: 'abc', title: 'X' } as any
    ;(service.getSheetById as jest.Mock).mockResolvedValue(sheet)
    const result = await resolver.findOne('abc' as any)
    expect(result).toEqual(sheet)
    expect(service.getSheetById).toHaveBeenCalledWith('abc')
  })

  it('createSheet should delegate to service', async () => {
    const input = { title: 'New', duration: 60 } as any
    const created = { _id: 'n1', ...input } as any
    ;(service.createSheet as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createSheet(input)
    expect(result).toEqual(created)
    expect(service.createSheet).toHaveBeenCalledWith(input)
  })

  it('updateSheet should delegate to service', async () => {
    const update = { _id: 'u1', title: 'Upd' } as any
    const updated = { _id: 'u1', title: 'Upd' } as any
    ;(service.updateSheet as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateSheet(update)
    expect(result).toEqual(updated)
    expect(service.updateSheet).toHaveBeenCalledWith('u1', update)
  })

  it('removeSheet should delegate to service', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeSheet as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeSheet('r1' as any)
    expect(result).toEqual(removed)
    expect(service.removeSheet).toHaveBeenCalledWith('r1')
  })
})
