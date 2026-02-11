import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { SheetService } from './sheet.service'

describe('SheetService', () => {
  let service: SheetService

  let mockSheetModel: any
  let mockRehearsalModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockSheetModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newSheet',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newSheet', ...dto })
    }))
    const findChain = {
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([
        { _id: 's1', title: 'B' },
        { _id: 's2', title: 'A' }
      ])
    }
    mockSheetModel.find = jest.fn().mockReturnValue(findChain)
    mockSheetModel.findById = jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ _id: 'sid' })
    })
    mockSheetModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'upd' }) })
    mockSheetModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    mockRehearsalModel = {
      aggregate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue([
          { _id: 's1', plays: 5 },
          { _id: 's2', plays: 3 }
        ])
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SheetService,
        { provide: getModelToken('Sheet'), useValue: mockSheetModel },
        { provide: getModelToken('Rehearsal'), useValue: mockRehearsalModel }
      ]
    }).compile()

    service = module.get<SheetService>(SheetService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createSheet should save', async () => {
    const res = await service.createSheet({ title: 'X' } as any)
    expect(res).toEqual({ _id: 'newSheet', title: 'X' })
    expect(mockSheetModel).toHaveBeenCalledWith({ title: 'X' })
  })

  it('findAllSheets should sort by plays then title', async () => {
    const res = await service.findAllSheets()
    // s1 plays 5, s2 plays 3; expect order s1, s2
    expect(res.map((s: any) => s._id)).toEqual(['s1', 's2'])
    expect(mockRehearsalModel.aggregate).toHaveBeenCalled()
    expect(mockSheetModel.find).toHaveBeenCalled()
  })

  it('getSheetById should populate', async () => {
    const res = await service.getSheetById('id' as any)
    expect(res).toEqual({ _id: 'sid' })
    expect(mockSheetModel.findById).toHaveBeenCalledWith('id')
  })

  it('updateSheet should call findByIdAndUpdate', async () => {
    const res = await service.updateSheet('u1' as any, { title: 'Upd' } as any)
    expect(res).toEqual({ _id: 'upd' })
    expect(mockSheetModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { title: 'Upd' },
      { new: true }
    )
  })

  it('removeSheet should call findByIdAndDelete', async () => {
    const res = await service.removeSheet('r1' as any)
    expect(res).toEqual({ acknowledged: true })
    expect(mockSheetModel.findByIdAndDelete).toHaveBeenCalledWith('r1')
  })
})
