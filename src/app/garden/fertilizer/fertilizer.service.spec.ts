import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { Fertilizer } from './entities/fertilizer.entity'
import { FertilizerService } from './fertilizer.service'

describe('FertilizerService', () => {
  let service: FertilizerService

  let mockModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newFertilizer',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newFertilizer', ...dto })
    }))

    mockModel.find = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([{ _id: 'f1' }])
    })
    mockModel.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: 'f1' })
    })
    mockModel.findByIdAndUpdate = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: 'f2' })
    })
    mockModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FertilizerService,
        {
          provide: getModelToken(Fertilizer.name),
          useValue: mockModel
        }
      ]
    }).compile()

    service = module.get<FertilizerService>(FertilizerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createFertilizer should save', async () => {
    const input = { name: 'NPK' } as any
    const result = await service.createFertilizer(input)
    expect(result).toEqual({ _id: 'newFertilizer', name: 'NPK' })
    expect(mockModel).toHaveBeenCalledWith(input)
  })

  it('findAllFertilizers should call find().exec()', async () => {
    const result = await service.findAllFertilizers()
    expect(result).toEqual([{ _id: 'f1' }])
    expect(mockModel.find).toHaveBeenCalled()
  })

  it('getFertilizerById should call findById(id).exec()', async () => {
    const result = await service.getFertilizerById('id1' as any)
    expect(result).toEqual({ _id: 'f1' })
    expect(mockModel.findById).toHaveBeenCalledWith('id1')
  })

  it('updateFertilizer should call findByIdAndUpdate with new:true', async () => {
    const update = { _id: 'id1', name: 'Updated' } as any
    const result = await service.updateFertilizer('id1' as any, update)
    expect(result).toEqual({ _id: 'f2' })
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith('id1', update, {
      new: true
    })
  })

  it('removeFertilizer should call findByIdAndDelete(id).exec()', async () => {
    const result = await service.removeFertilizer('id1' as any)
    expect(result).toEqual({ acknowledged: true })
    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('id1')
  })
})
