import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { InstrumentService } from './instrument.service'

describe('InstrumentService', () => {
  let service: InstrumentService

  let mockModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newInst',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newInst', ...dto })
    }))
    mockModel.find = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue([{ _id: 'i1' }]) })
    mockModel.findById = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'iid' }) })
    mockModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'upd' }) })
    mockModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstrumentService,
        { provide: getModelToken('Instrument'), useValue: mockModel }
      ]
    }).compile()

    service = module.get<InstrumentService>(InstrumentService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createInstrument should save', async () => {
    const res = await service.createInstrument({ name: 'X' } as any)
    expect(res).toEqual({ _id: 'newInst', name: 'X' })
    expect(mockModel).toHaveBeenCalledWith({ name: 'X' })
  })

  it('findAllInstruments should return list', async () => {
    const res = await service.findAllInstruments()
    expect(res).toEqual([{ _id: 'i1' }])
    expect(mockModel.find).toHaveBeenCalled()
  })

  it('getInstrumentById should call findById', async () => {
    const res = await service.getInstrumentById('id' as any)
    expect(res).toEqual({ _id: 'iid' })
    expect(mockModel.findById).toHaveBeenCalledWith('id')
  })

  it('updateInstrument should call findByIdAndUpdate', async () => {
    const res = await service.updateInstrument(
      'u1' as any,
      { name: 'Upd' } as any
    )
    expect(res).toEqual({ _id: 'upd' })
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { name: 'Upd' },
      { new: true }
    )
  })

  it('removeInstrument should call findByIdAndDelete', async () => {
    const res = await service.removeInstrument('r1' as any)
    expect(res).toEqual({ acknowledged: true })
    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('r1')
  })
})
