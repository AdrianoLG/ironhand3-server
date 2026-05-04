/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing'

import { MovieResolver } from './movie.resolver'
import { MovieService } from './movie.service'

describe('MovieResolver', () => {
  let resolver: MovieResolver
  let service: MovieService

  const mockService = {
    createMovie: jest.fn(),
    findAllMovies: jest.fn(),
    getMovieById: jest.fn(),
    updateMovie: jest.fn(),
    removeMovie: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieResolver,
        { provide: MovieService, useValue: mockService }
      ]
    }).compile()

    resolver = module.get<MovieResolver>(MovieResolver)
    service = module.get<MovieService>(MovieService)
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('createMovie should delegate to service', async () => {
    const input = { title: 'Inception', cover: 'inception.jpg' } as any
    const created = { _id: 'm1', ...input }
    ;(service.createMovie as jest.Mock).mockResolvedValue(created)

    const result = await resolver.createMovie(input)

    expect(service.createMovie).toHaveBeenCalledWith(input)
    expect(result).toEqual(created)
  })

  it('findAll should return movies from service', async () => {
    const list = [{ _id: 'm1', title: 'Interstellar' }]
    ;(service.findAllMovies as jest.Mock).mockResolvedValue(list)

    const result = await resolver.findAll()

    expect(service.findAllMovies).toHaveBeenCalled()
    expect(result).toEqual(list)
  })

  it('findOne should fetch movie by id', async () => {
    const movie = { _id: 'm9', title: 'Memento' }
    ;(service.getMovieById as jest.Mock).mockResolvedValue(movie)

    const result = await resolver.findOne('m9' as any)

    expect(service.getMovieById).toHaveBeenCalledWith('m9')
    expect(result).toEqual(movie)
  })

  it('updateMovie should use _id from input', async () => {
    const input = { _id: 'u1', title: 'Updated Movie' } as any
    const updated = { _id: 'u1', title: 'Updated Movie' }
    ;(service.updateMovie as jest.Mock).mockResolvedValue(updated)

    const result = await resolver.updateMovie(input)

    expect(service.updateMovie).toHaveBeenCalledWith('u1', input)
    expect(result).toEqual(updated)
  })

  it('removeMovie should delegate to service', async () => {
    const removed = { _id: 'r1' }
    ;(service.removeMovie as jest.Mock).mockResolvedValue(removed)

    const result = await resolver.removeMovie('r1' as any)

    expect(service.removeMovie).toHaveBeenCalledWith('r1')
    expect(result).toEqual(removed)
  })
})
