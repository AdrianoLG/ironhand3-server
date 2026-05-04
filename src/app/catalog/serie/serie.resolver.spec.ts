/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing'

import { SerieResolver } from './serie.resolver'
import { SerieService } from './serie.service'

describe('SerieResolver', () => {
  let resolver: SerieResolver
  let service: SerieService

  const mockService = {
    createSerie: jest.fn(),
    findAllSeries: jest.fn(),
    getSerieById: jest.fn(),
    updateSerie: jest.fn(),
    removeSerie: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SerieResolver,
        { provide: SerieService, useValue: mockService }
      ]
    }).compile()

    resolver = module.get<SerieResolver>(SerieResolver)
    service = module.get<SerieService>(SerieService)
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('createSerie should delegate to service', async () => {
    const input = { title: 'Dark' } as any
    const created = { _id: 's1', ...input }
    ;(service.createSerie as jest.Mock).mockResolvedValue(created)

    const result = await resolver.createSerie(input)

    expect(service.createSerie).toHaveBeenCalledWith(input)
    expect(result).toEqual(created)
  })

  it('findAll should return series from service', async () => {
    const list = [{ _id: 's1', title: 'Lost' }]
    ;(service.findAllSeries as jest.Mock).mockResolvedValue(list)

    const result = await resolver.findAll()

    expect(service.findAllSeries).toHaveBeenCalled()
    expect(result).toEqual(list)
  })

  it('findOne should fetch serie by id', async () => {
    const serie = { _id: 's9', title: 'The Office' }
    ;(service.getSerieById as jest.Mock).mockResolvedValue(serie)

    const result = await resolver.findOne('s9' as any)

    expect(service.getSerieById).toHaveBeenCalledWith('s9')
    expect(result).toEqual(serie)
  })

  it('updateSerie should use _id from input', async () => {
    const input = { _id: 'u1', title: 'Updated Serie' } as any
    const updated = { _id: 'u1', title: 'Updated Serie' }
    ;(service.updateSerie as jest.Mock).mockResolvedValue(updated)

    const result = await resolver.updateSerie(input)

    expect(service.updateSerie).toHaveBeenCalledWith('u1', input)
    expect(result).toEqual(updated)
  })

  it('removeSerie should delegate to service', async () => {
    const removed = { _id: 'r1' }
    ;(service.removeSerie as jest.Mock).mockResolvedValue(removed)

    const result = await resolver.removeSerie('r1' as any)

    expect(service.removeSerie).toHaveBeenCalledWith('r1')
    expect(result).toEqual(removed)
  })
})
