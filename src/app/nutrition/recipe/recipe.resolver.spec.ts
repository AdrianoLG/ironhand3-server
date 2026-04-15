/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing'

import { RecipeMachine } from './entities/recipe.entity'
import { RecipeResolver } from './recipe.resolver'
import { RecipeService } from './recipe.service'

describe('RecipeResolver', () => {
  let resolver: RecipeResolver

  let service: RecipeService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeResolver,
        {
          provide: RecipeService,
          useValue: {
            createRecipe: jest.fn(),
            findAllRecipes: jest.fn(),
            getRecipeById: jest.fn(),
            updateRecipe: jest.fn(),
            removeRecipe: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<RecipeResolver>(RecipeResolver)
    service = module.get<RecipeService>(RecipeService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('createRecipe should delegate', async () => {
    const input = {
      name: 'Pasta',
      ingredients: [
        { name: 'Tomato', image: 'tomato.avif', qty: 2, unit: 'pcs' }
      ],
      steps: ['Boil water', 'Add pasta'],
      gallery: ['pasta.avif'],
      machine: RecipeMachine.OVEN
    } as any
    const created = { _id: 'r1', ...input } as any
    ;(service.createRecipe as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createRecipe(input)
    expect(result).toEqual(created)
    expect(service.createRecipe).toHaveBeenCalledWith(input)
  })

  it('recipes should return from service', async () => {
    const items = [{ _id: 'r1' }] as any
    ;(service.findAllRecipes as jest.Mock).mockResolvedValue(items)
    const result = await resolver.recipes()
    expect(result).toEqual(items)
    expect(service.findAllRecipes).toHaveBeenCalled()
  })

  it('recipe should delegate by id', async () => {
    const item = { _id: 'r1' } as any
    ;(service.getRecipeById as jest.Mock).mockResolvedValue(item)
    const result = await resolver.recipe('id1' as any)
    expect(result).toEqual(item)
    expect(service.getRecipeById).toHaveBeenCalledWith('id1')
  })

  it('updateRecipe should delegate', async () => {
    const update = {
      _id: 'id1',
      name: 'Updated Pasta',
      machine: RecipeMachine.MIXER
    } as any
    const updated = {
      _id: 'id1',
      name: 'Updated Pasta',
      machine: RecipeMachine.MIXER
    } as any
    ;(service.updateRecipe as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateRecipe(update)
    expect(result).toEqual(updated)
    expect(service.updateRecipe).toHaveBeenCalledWith('id1', update)
  })

  it('removeRecipe should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeRecipe as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeRecipe('id1' as any)
    expect(result).toEqual(removed)
    expect(service.removeRecipe).toHaveBeenCalledWith('id1')
  })
})
