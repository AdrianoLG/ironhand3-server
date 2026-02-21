import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { Plant } from './entities/plant.entity'
import { PlantService } from './plant.service'

describe('PlantService', () => {
  let service: PlantService

  let mockModel: any

  let findChain: any
  let findByIdChain: any
  let updateChain: any

  beforeEach(async () => {
    const save = jest.fn()
    mockModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newPlant',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newPlant', ...dto })
    }))

    findChain = {
      sort: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([{ _id: 'p1' }])
    }
    mockModel.find = jest.fn().mockReturnValue(findChain)

    findByIdChain = {
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ _id: 'p1' })
    }
    mockModel.findById = jest.fn().mockReturnValue(findByIdChain)

    updateChain = {
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ _id: 'p2' })
    }
    mockModel.findByIdAndUpdate = jest.fn().mockReturnValue(updateChain)

    mockModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlantService,
        {
          provide: getModelToken(Plant.name),
          useValue: mockModel
        }
      ]
    }).compile()

    service = module.get<PlantService>(PlantService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createPlant should save', async () => {
    const input = { name: 'Plant' } as any
    const result = await service.createPlant(input)
    expect(result).toEqual({ _id: 'newPlant', name: 'Plant' })
    expect(mockModel).toHaveBeenCalledWith(input)
  })

  it('findAllPlants should sort by planted desc and populate specie + watering(fertilizers)', async () => {
    const result = await service.findAllPlants()
    expect(result).toEqual([{ _id: 'p1' }])
    expect(mockModel.find).toHaveBeenCalled()
    expect(findChain.sort).toHaveBeenCalledWith({ planted: -1 })
    expect(findChain.populate).toHaveBeenNthCalledWith(1, 'specie')
    expect(findChain.populate).toHaveBeenNthCalledWith(2, {
      path: 'watering',
      populate: { path: 'fertilizers.fertilizer' }
    })
  })

  it('getPlantById should populate specie + watering(fertilizers)', async () => {
    const result = await service.getPlantById('id1' as any)
    expect(result).toEqual({ _id: 'p1' })
    expect(mockModel.findById).toHaveBeenCalledWith('id1')
    expect(findByIdChain.populate).toHaveBeenNthCalledWith(1, 'specie')
    expect(findByIdChain.populate).toHaveBeenNthCalledWith(2, {
      path: 'watering',
      populate: { path: 'fertilizers.fertilizer' }
    })
  })

  it('updatePlant should update with new:true and populate specie + watering(fertilizers)', async () => {
    const update = { _id: 'id1', name: 'Updated' } as any
    const result = await service.updatePlant('id1' as any, update)
    expect(result).toEqual({ _id: 'p2' })
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith('id1', update, {
      new: true
    })
    expect(updateChain.populate).toHaveBeenNthCalledWith(1, 'specie')
    expect(updateChain.populate).toHaveBeenNthCalledWith(2, {
      path: 'watering',
      populate: { path: 'fertilizers.fertilizer' }
    })
  })

  it('removePlant should delete', async () => {
    const result = await service.removePlant('id1' as any)
    expect(result).toEqual({ acknowledged: true })
    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('id1')
  })
})
