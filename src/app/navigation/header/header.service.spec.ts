import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { HeaderService } from './header.service'

describe('HeaderService', () => {
  let service: HeaderService

  let mockHeaderModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockHeaderModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newHeader',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newHeader', ...dto })
    }))
    mockHeaderModel.find = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue([{ _id: 'h1' }]) })
    mockHeaderModel.findById = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'hid' }) })
    mockHeaderModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'upd' }) })
    mockHeaderModel.deleteOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeaderService,
        { provide: getModelToken('Header'), useValue: mockHeaderModel }
      ]
    }).compile()

    service = module.get<HeaderService>(HeaderService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createHeader should save', async () => {
    const res = await service.createHeader({ title: 'X' } as any)
    expect(res).toEqual({ _id: 'newHeader', title: 'X' })
    expect(mockHeaderModel).toHaveBeenCalledWith({ title: 'X' })
  })

  it('findAllHeaders should return list', async () => {
    const res = await service.findAllHeaders()
    expect(res).toEqual([{ _id: 'h1' }])
    expect(mockHeaderModel.find).toHaveBeenCalled()
  })

  it('getHeaderById should call findById', async () => {
    const res = await service.getHeaderById('id' as any)
    expect(res).toEqual({ _id: 'hid' })
    expect(mockHeaderModel.findById).toHaveBeenCalledWith('id')
  })

  it('updateHeader should call findByIdAndUpdate', async () => {
    const res = await service.updateHeader('u1' as any, { title: 'Upd' } as any)
    expect(res).toEqual({ _id: 'upd' })
    expect(mockHeaderModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { title: 'Upd' },
      { new: true }
    )
  })

  it('removeHeader should call deleteOne', async () => {
    const res = await service.removeHeader('r1' as any)
    expect(res).toEqual({ acknowledged: true })
    expect(mockHeaderModel.deleteOne).toHaveBeenCalledWith({ _id: 'r1' })
  })
})
