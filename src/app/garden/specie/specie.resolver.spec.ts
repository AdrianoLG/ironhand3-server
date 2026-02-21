import { Test, TestingModule } from '@nestjs/testing'

import { SpecieResolver } from './specie.resolver'
import { SpecieService } from './specie.service'

describe('SpecieResolver', () => {
  let resolver: SpecieResolver

  let service: SpecieService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpecieResolver,
        {
          provide: SpecieService,
          useValue: {
            createSpecie: jest.fn(),
            findAllSpecies: jest.fn(),
            getSpecieById: jest.fn(),
            updateSpecie: jest.fn(),
            removeSpecie: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<SpecieResolver>(SpecieResolver)
    service = module.get<SpecieService>(SpecieService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('createSpecie should delegate', async () => {
    const input = { name: 'Monstera' } as any
    const created = { _id: 's1', name: 'Monstera' } as any
    ;(service.createSpecie as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createSpecie(input)
    expect(result).toEqual(created)
    expect(service.createSpecie).toHaveBeenCalledWith(input)
  })

  it('species should return from service', async () => {
    const items = [{ _id: 's1' }] as any
    ;(service.findAllSpecies as jest.Mock).mockResolvedValue(items)
    const result = await resolver.species()
    expect(result).toEqual(items)
    expect(service.findAllSpecies).toHaveBeenCalled()
  })

  it('specie should delegate by id', async () => {
    const item = { _id: 's1' } as any
    ;(service.getSpecieById as jest.Mock).mockResolvedValue(item)
    const result = await resolver.specie('id1' as any)
    expect(result).toEqual(item)
    expect(service.getSpecieById).toHaveBeenCalledWith('id1')
  })

  it('updateSpecie should delegate', async () => {
    const update = { _id: 'id1', name: 'Updated' } as any
    const updated = { _id: 'id1', name: 'Updated' } as any
    ;(service.updateSpecie as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateSpecie(update)
    expect(result).toEqual(updated)
    expect(service.updateSpecie).toHaveBeenCalledWith('id1', update)
  })

  it('removeSpecie should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeSpecie as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeSpecie('id1' as any)
    expect(result).toEqual(removed)
    expect(service.removeSpecie).toHaveBeenCalledWith('id1')
  })
})
