/// <reference types="jest" />
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { Ingredient } from './entities/ingredient.entity'
import { IngredientService } from './ingredient.service'

describe('IngredientService', () => {
  let service: IngredientService

  let mockModel: any
  let findChain: any

  beforeEach(async () => {
    const save = jest.fn()
    mockModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newIngredient',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newIngredient', ...dto })
    }))

    findChain = {
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([{ _id: 'i1' }])
    }
    mockModel.find = jest.fn().mockReturnValue(findChain)

    mockModel.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: 'i1' })
    })
    mockModel.findByIdAndUpdate = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: 'i2' })
    })
    mockModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngredientService,
        {
          provide: getModelToken(Ingredient.name),
          useValue: mockModel
        }
      ]
    }).compile()

    service = module.get<IngredientService>(IngredientService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createIngredient should save', async () => {
    const input = {
      name: 'Tomato',
      image: 'tomato.avif',
      qty: 2,
      unit: 'pcs'
    } as any
    const result = await service.createIngredient(input)
    expect(result).toEqual({ _id: 'newIngredient', ...input })
    expect(mockModel).toHaveBeenCalledWith(input)
  })

  it('findAllIngredients should sort by name asc', async () => {
    const result = await service.findAllIngredients()
    expect(result).toEqual([{ _id: 'i1' }])
    expect(mockModel.find).toHaveBeenCalled()
    expect(findChain.sort).toHaveBeenCalledWith({ name: 1 })
  })

  it('getIngredientById should call findById(id).exec()', async () => {
    const result = await service.getIngredientById('id1' as any)
    expect(result).toEqual({ _id: 'i1' })
    expect(mockModel.findById).toHaveBeenCalledWith('id1')
  })

  it('updateIngredient should call findByIdAndUpdate with new:true', async () => {
    const update = { _id: 'id1', name: 'Cherry Tomato', qty: 250 } as any
    const result = await service.updateIngredient('id1' as any, update)
    expect(result).toEqual({ _id: 'i2' })
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith('id1', update, {
      new: true
    })
  })

  it('removeIngredient should call findByIdAndDelete(id).exec()', async () => {
    const result = await service.removeIngredient('id1' as any)
    expect(result).toEqual({ acknowledged: true })
    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('id1')
  })
})
