import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { CropService } from './crop.service'
import { Crop } from './entities/crop.entity'

describe('CropService', () => {
  let service: CropService

  let mockModel: any

  let findChain: any
  let findByIdChain: any
  let updateChain: any

  beforeEach(async () => {
    const save = jest.fn()
    mockModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newCrop',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newCrop', ...dto })
    }))

    findChain = {
      sort: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([{ _id: 'c1' }])
    }
    mockModel.find = jest.fn().mockReturnValue(findChain)

    findByIdChain = {
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ _id: 'c1' })
    }
    mockModel.findById = jest.fn().mockReturnValue(findByIdChain)

    updateChain = {
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ _id: 'c2' })
    }
    mockModel.findByIdAndUpdate = jest.fn().mockReturnValue(updateChain)

    mockModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropService,
        {
          provide: getModelToken(Crop.name),
          useValue: mockModel
        }
      ]
    }).compile()

    service = module.get<CropService>(CropService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createCrop should save', async () => {
    const input = { name: 'Grow 2026' } as any
    const result = await service.createCrop(input)
    expect(result).toEqual({ _id: 'newCrop', name: 'Grow 2026' })
    expect(mockModel).toHaveBeenCalledWith(input)
  })

  it('findAllCrops should sort by startDate desc and populate plants + cropContainer + watering(fertilizers)', async () => {
    const result = await service.findAllCrops()
    expect(result).toEqual([{ _id: 'c1' }])
    expect(mockModel.find).toHaveBeenCalled()
    expect(findChain.sort).toHaveBeenCalledWith({ startDate: -1 })
    expect(findChain.populate).toHaveBeenNthCalledWith(1, 'plants')
    expect(findChain.populate).toHaveBeenNthCalledWith(2, 'cropContainer')
    expect(findChain.populate).toHaveBeenNthCalledWith(3, {
      path: 'watering',
      populate: { path: 'fertilizers.fertilizer' }
    })
  })

  it('getCropById should populate plants + cropContainer + watering(fertilizers)', async () => {
    const result = await service.getCropById('id1' as any)
    expect(result).toEqual({ _id: 'c1' })
    expect(mockModel.findById).toHaveBeenCalledWith('id1')
    expect(findByIdChain.populate).toHaveBeenNthCalledWith(1, 'plants')
    expect(findByIdChain.populate).toHaveBeenNthCalledWith(2, 'cropContainer')
    expect(findByIdChain.populate).toHaveBeenNthCalledWith(3, {
      path: 'watering',
      populate: { path: 'fertilizers.fertilizer' }
    })
  })

  it('updateCrop should update with new:true and populate plants + cropContainer + watering(fertilizers)', async () => {
    const update = { _id: 'id1', name: 'Updated' } as any
    const result = await service.updateCrop('id1' as any, update)
    expect(result).toEqual({ _id: 'c2' })
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith('id1', update, {
      new: true
    })
    expect(updateChain.populate).toHaveBeenNthCalledWith(1, 'plants')
    expect(updateChain.populate).toHaveBeenNthCalledWith(2, 'cropContainer')
    expect(updateChain.populate).toHaveBeenNthCalledWith(3, {
      path: 'watering',
      populate: { path: 'fertilizers.fertilizer' }
    })
  })

  it('removeCrop should delete', async () => {
    const result = await service.removeCrop('id1' as any)
    expect(result).toEqual({ acknowledged: true })
    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('id1')
  })
})
