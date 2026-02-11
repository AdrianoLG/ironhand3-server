import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { RoomsService } from './rooms.service'

describe('RoomsService', () => {
  let service: RoomsService

  let mockRoomModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockRoomModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newRoom',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newRoom', ...dto })
    }))
    mockRoomModel.find = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue([{ _id: 'r1' }]) })
    mockRoomModel.findById = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'rid' }) })
    mockRoomModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'upd' }) })
    mockRoomModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        { provide: getModelToken('Room'), useValue: mockRoomModel }
      ]
    }).compile()

    service = module.get<RoomsService>(RoomsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createRoom should create and save', async () => {
    const res = await service.createRoom({ name: 'X' } as any)
    expect(res).toEqual({ _id: 'newRoom', name: 'X' })
    expect(mockRoomModel).toHaveBeenCalledWith({ name: 'X' })
  })

  it('findAllRooms should return list', async () => {
    const res = await service.findAllRooms()
    expect(res).toEqual([{ _id: 'r1' }])
    expect(mockRoomModel.find).toHaveBeenCalled()
  })

  it('getRoomById should call findById', async () => {
    const res = await service.getRoomById('id' as any)
    expect(res).toEqual({ _id: 'rid' })
    expect(mockRoomModel.findById).toHaveBeenCalledWith('id')
  })

  it('updateRoom should call findByIdAndUpdate', async () => {
    const res = await service.updateRoom('u1' as any, { name: 'Upd' } as any)
    expect(res).toEqual({ _id: 'upd' })
    expect(mockRoomModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { name: 'Upd' },
      { new: true }
    )
  })

  it('removeRoom should call findByIdAndDelete', async () => {
    const res = await service.removeRoom('r1' as any)
    expect(res).toEqual({ acknowledged: true })
    expect(mockRoomModel.findByIdAndDelete).toHaveBeenCalledWith('r1')
  })
})
