/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing'

import { IngredientResolver } from './ingredient.resolver'
import { IngredientService } from './ingredient.service'

describe('IngredientResolver', () => {
  let resolver: IngredientResolver

  let service: IngredientService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientResolver,
        {
          provide: IngredientService,
          useValue: {
            createIngredient: jest.fn(),
            findAllIngredients: jest.fn(),
            getIngredientById: jest.fn(),
            updateIngredient: jest.fn(),
            removeIngredient: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<IngredientResolver>(IngredientResolver)
    service = module.get<IngredientService>(IngredientService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('createIngredient should delegate', async () => {
    const input = {
      name: 'Tomato',
      image: 'tomato.avif',
      qty: 2,
      unit: 'pcs'
    } as any
    const created = { _id: 'i1', ...input } as any
    ;(service.createIngredient as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createIngredient(input)
    expect(result).toEqual(created)
    expect(service.createIngredient).toHaveBeenCalledWith(input)
  })

  it('ingredients should return from service', async () => {
    const items = [{ _id: 'i1' }] as any
    ;(service.findAllIngredients as jest.Mock).mockResolvedValue(items)
    const result = await resolver.ingredients()
    expect(result).toEqual(items)
    expect(service.findAllIngredients).toHaveBeenCalled()
  })

  it('ingredient should delegate by id', async () => {
    const item = { _id: 'i1' } as any
    ;(service.getIngredientById as jest.Mock).mockResolvedValue(item)
    const result = await resolver.ingredient('id1' as any)
    expect(result).toEqual(item)
    expect(service.getIngredientById).toHaveBeenCalledWith('id1')
  })

  it('updateIngredient should delegate', async () => {
    const update = { _id: 'id1', name: 'Cherry Tomato', qty: 250 } as any
    const updated = { _id: 'id1', name: 'Cherry Tomato', qty: 250 } as any
    ;(service.updateIngredient as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateIngredient(update)
    expect(result).toEqual(updated)
    expect(service.updateIngredient).toHaveBeenCalledWith('id1', update)
  })

  it('removeIngredient should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeIngredient as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeIngredient('id1' as any)
    expect(result).toEqual(removed)
    expect(service.removeIngredient).toHaveBeenCalledWith('id1')
  })
})
