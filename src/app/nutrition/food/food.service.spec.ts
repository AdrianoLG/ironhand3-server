/// <reference types="jest" />
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { Food, FoodTimeOfDay } from './entities/food.entity'
import { FoodService } from './food.service'

describe('FoodService', () => {
  let service: FoodService

  let mockModel: any
  let findChain: any

  beforeEach(async () => {
    const save = jest.fn()
    mockModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newFood',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newFood', ...dto })
    }))

    findChain = {
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([{ _id: 'f1' }])
    }
    mockModel.find = jest.fn().mockReturnValue(findChain)

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
        FoodService,
        {
          provide: getModelToken(Food.name),
          useValue: mockModel
        }
      ]
    }).compile()

    service = module.get<FoodService>(FoodService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createFood should save', async () => {
    const input = {
      name: 'Eggs',
      timeOfDay: FoodTimeOfDay.BREAKFAST,
      kcal: 155,
      fats: 11,
      carbs: 1,
      proteins: 13,
      qty: 2,
      unit: 'u',
      created: new Date('2026-04-15')
    } as any
    const result = await service.createFood(input)
    expect(result).toEqual({ _id: 'newFood', ...input })
    expect(mockModel).toHaveBeenCalledWith(input)
  })

  it('findAllFoods should sort by created desc', async () => {
    const result = await service.findAllFoods()
    expect(result).toEqual([{ _id: 'f1' }])
    expect(mockModel.find).toHaveBeenCalled()
    expect(findChain.sort).toHaveBeenCalledWith({ created: -1 })
  })

  it('getFoodById should call findById(id).exec()', async () => {
    const result = await service.getFoodById('id1' as any)
    expect(result).toEqual({ _id: 'f1' })
    expect(mockModel.findById).toHaveBeenCalledWith('id1')
  })

  it('updateFood should call findByIdAndUpdate with new:true', async () => {
    const update = {
      _id: 'id1',
      name: 'Updated Eggs',
      timeOfDay: FoodTimeOfDay.BREAKFAST,
      qty: 3,
      unit: 'u'
    } as any
    const result = await service.updateFood('id1' as any, update)
    expect(result).toEqual({ _id: 'f2' })
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith('id1', update, {
      new: true
    })
  })

  it('removeFood should call findByIdAndDelete(id).exec()', async () => {
    const result = await service.removeFood('id1' as any)
    expect(result).toEqual({ acknowledged: true })
    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('id1')
  })
})
