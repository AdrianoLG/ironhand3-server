/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing'

import { GenreResolver } from './genre.resolver'
import { GenreService } from './genre.service'

describe('GenreResolver', () => {
  let resolver: GenreResolver
  let service: GenreService

  const mockService = {
    createGenre: jest.fn(),
    findAllGenres: jest.fn(),
    getGenreById: jest.fn(),
    updateGenre: jest.fn(),
    removeGenre: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenreResolver,
        { provide: GenreService, useValue: mockService }
      ]
    }).compile()

    resolver = module.get<GenreResolver>(GenreResolver)
    service = module.get<GenreService>(GenreService)
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('createGenre should delegate to service', async () => {
    const input = { name: 'Fantasy', slug: 'fantasy' } as any
    const created = { _id: 'g1', ...input }
    ;(service.createGenre as jest.Mock).mockResolvedValue(created)

    const result = await resolver.createGenre(input)

    expect(service.createGenre).toHaveBeenCalledWith(input)
    expect(result).toEqual(created)
  })

  it('findAll should return genres from service', async () => {
    const list = [{ _id: 'g1', name: 'Drama' }]
    ;(service.findAllGenres as jest.Mock).mockResolvedValue(list)

    const result = await resolver.findAll()

    expect(service.findAllGenres).toHaveBeenCalled()
    expect(result).toEqual(list)
  })

  it('findOne should fetch genre by id', async () => {
    const genre = { _id: 'g9', name: 'Sci-fi' }
    ;(service.getGenreById as jest.Mock).mockResolvedValue(genre)

    const result = await resolver.findOne('g9' as any)

    expect(service.getGenreById).toHaveBeenCalledWith('g9')
    expect(result).toEqual(genre)
  })

  it('updateGenre should use _id from input', async () => {
    const input = { _id: 'u1', name: 'Updated Genre' } as any
    const updated = { _id: 'u1', name: 'Updated Genre' }
    ;(service.updateGenre as jest.Mock).mockResolvedValue(updated)

    const result = await resolver.updateGenre(input)

    expect(service.updateGenre).toHaveBeenCalledWith('u1', input)
    expect(result).toEqual(updated)
  })

  it('removeGenre should delegate to service', async () => {
    const removed = { _id: 'r1' }
    ;(service.removeGenre as jest.Mock).mockResolvedValue(removed)

    const result = await resolver.removeGenre('r1' as any)

    expect(service.removeGenre).toHaveBeenCalledWith('r1')
    expect(result).toEqual(removed)
  })
})
