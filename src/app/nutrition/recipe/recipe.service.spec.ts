/// <reference types="jest" />
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { Recipe, RecipeMachine } from './entities/recipe.entity'
import { RecipeService } from './recipe.service'

describe('RecipeService', () => {
  let service: RecipeService

  let mockModel: any
  let findChain: any

  beforeEach(async () => {
    const save = jest.fn()
    mockModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newRecipe',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newRecipe', ...dto })
    }))

    findChain = {
      sort: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([{ _id: 'r1' }])
    }
    mockModel.find = jest.fn().mockReturnValue(findChain)

    mockModel.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: 'r1' })
    })
    mockModel.findByIdAndUpdate = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: 'r2' })
    })
    mockModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        {
          provide: getModelToken(Recipe.name),
          useValue: mockModel
        }
      ]
    }).compile()

    service = module.get<RecipeService>(RecipeService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createRecipe should save', async () => {
    const input = {
      name: 'Pasta',
      ingredients: [
        { name: 'Tomato', image: 'tomato.avif', qty: 2, unit: 'pcs' }
      ],
      steps: ['Boil water', 'Add pasta'],
      gallery: ['pasta.avif'],
      machine: RecipeMachine.OVEN
    } as any
    const result = await service.createRecipe(input)
    expect(result).toEqual({ _id: 'newRecipe', ...input })
    expect(mockModel).toHaveBeenCalledWith(input)
  })

  it('findAllRecipes should sort by name asc', async () => {
    const result = await service.findAllRecipes()
    expect(result).toEqual([{ _id: 'r1' }])
    expect(mockModel.find).toHaveBeenCalled()
    expect(findChain.sort).toHaveBeenCalledWith({ name: 1 })
  })

  it('getRecipeById should call findById(id).exec()', async () => {
    const result = await service.getRecipeById('id1' as any)
    expect(result).toEqual({ _id: 'r1' })
    expect(mockModel.findById).toHaveBeenCalledWith('id1')
  })

  it('updateRecipe should call findByIdAndUpdate with new:true', async () => {
    const update = {
      _id: 'id1',
      name: 'Updated Pasta',
      machine: RecipeMachine.MIXER
    } as any
    const result = await service.updateRecipe('id1' as any, update)
    expect(result).toEqual({ _id: 'r2' })
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith('id1', update, {
      new: true
    })
  })

  it('removeRecipe should call findByIdAndDelete(id).exec()', async () => {
    const result = await service.removeRecipe('id1' as any)
    expect(result).toEqual({ acknowledged: true })
    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('id1')
  })
})
