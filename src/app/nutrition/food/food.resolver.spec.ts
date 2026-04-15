/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing'

import { FoodTimeOfDay } from './entities/food.entity'
import { FoodResolver } from './food.resolver'
import { FoodService } from './food.service'

describe('FoodResolver', () => {
  let resolver: FoodResolver

  let service: FoodService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodResolver,
        {
          provide: FoodService,
          useValue: {
            createFood: jest.fn(),
            findAllFoods: jest.fn(),
            getFoodById: jest.fn(),
            updateFood: jest.fn(),
            removeFood: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<FoodResolver>(FoodResolver)
    service = module.get<FoodService>(FoodService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('createFood should delegate', async () => {
    const input = {
      name: 'Eggs',
      timeOfDay: FoodTimeOfDay.BREAKFAST,
      kcal: 155,
      proteins: 13,
      qty: 2,
      unit: 'u',
      created: new Date('2026-04-15')
    } as any
    const created = { _id: 'f1', ...input } as any
    ;(service.createFood as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createFood(input)
    expect(result).toEqual(created)
    expect(service.createFood).toHaveBeenCalledWith(input)
  })

  it('foods should return from service', async () => {
    const items = [{ _id: 'f1' }] as any
    ;(service.findAllFoods as jest.Mock).mockResolvedValue(items)
    const result = await resolver.foods()
    expect(result).toEqual(items)
    expect(service.findAllFoods).toHaveBeenCalled()
  })

  it('food should delegate by id', async () => {
    const item = { _id: 'f1' } as any
    ;(service.getFoodById as jest.Mock).mockResolvedValue(item)
    const result = await resolver.food('id1' as any)
    expect(result).toEqual(item)
    expect(service.getFoodById).toHaveBeenCalledWith('id1')
  })

  it('updateFood should delegate', async () => {
    const update = {
      _id: 'id1',
      name: 'Updated Eggs',
      timeOfDay: FoodTimeOfDay.BREAKFAST,
      qty: 3,
      unit: 'u'
    } as any
    const updated = {
      _id: 'id1',
      name: 'Updated Eggs',
      qty: 3,
      unit: 'u'
    } as any
    ;(service.updateFood as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateFood(update)
    expect(result).toEqual(updated)
    expect(service.updateFood).toHaveBeenCalledWith('id1', update)
  })

  it('removeFood should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeFood as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeFood('id1' as any)
    expect(result).toEqual(removed)
    expect(service.removeFood).toHaveBeenCalledWith('id1')
  })
})
