/// <reference types="jest" />
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { MovieService } from './movie.service'

describe('MovieService', () => {
  let service: MovieService
  let mockMovieModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockMovieModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newMovie',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newMovie', ...dto })
    }))

    const findExec = jest.fn().mockResolvedValue([{ _id: 'm1' }])
    const findChain = {
      sort: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      exec: findExec
    }

    const findByIdExec = jest.fn().mockResolvedValue({ _id: 'mid' })
    const findByIdChain = {
      populate: jest.fn().mockReturnThis(),
      exec: findByIdExec
    }

    const updateExec = jest.fn().mockResolvedValue({ _id: 'upd' })
    const updateChain = {
      populate: jest.fn().mockReturnThis(),
      exec: updateExec
    }

    mockMovieModel.find = jest.fn().mockReturnValue(findChain)
    mockMovieModel.findById = jest.fn().mockReturnValue(findByIdChain)
    mockMovieModel.findByIdAndUpdate = jest.fn().mockReturnValue(updateChain)
    mockMovieModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        { provide: getModelToken('Movie'), useValue: mockMovieModel }
      ]
    }).compile()

    service = module.get<MovieService>(MovieService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createMovie should create and save', async () => {
    const res = await service.createMovie({ title: 'Inception' } as any)
    expect(res).toEqual({ _id: 'newMovie', title: 'Inception' })
    expect(mockMovieModel).toHaveBeenCalledWith({ title: 'Inception' })
  })

  it('findAllMovies should sort and populate relations', async () => {
    const res = await service.findAllMovies()
    expect(res).toEqual([{ _id: 'm1' }])
    expect(mockMovieModel.find).toHaveBeenCalled()
    expect(mockMovieModel.find().sort).toHaveBeenCalledWith({ title: 1 })
    expect(mockMovieModel.find().populate).toHaveBeenNthCalledWith(
      1,
      'director'
    )
    expect(mockMovieModel.find().populate).toHaveBeenNthCalledWith(2, 'actors')
    expect(mockMovieModel.find().populate).toHaveBeenNthCalledWith(3, 'country')
    expect(mockMovieModel.find().populate).toHaveBeenNthCalledWith(4, 'genres')
  })

  it('getMovieById should call findById and populate relations', async () => {
    const res = await service.getMovieById('id' as any)
    expect(res).toEqual({ _id: 'mid' })
    expect(mockMovieModel.findById).toHaveBeenCalledWith('id')
    expect(mockMovieModel.findById().populate).toHaveBeenNthCalledWith(
      1,
      'director'
    )
    expect(mockMovieModel.findById().populate).toHaveBeenNthCalledWith(
      2,
      'actors'
    )
    expect(mockMovieModel.findById().populate).toHaveBeenNthCalledWith(
      3,
      'country'
    )
    expect(mockMovieModel.findById().populate).toHaveBeenNthCalledWith(
      4,
      'genres'
    )
  })

  it('updateMovie should call findByIdAndUpdate and populate relations', async () => {
    const res = await service.updateMovie('u1' as any, { title: 'Upd' } as any)
    expect(res).toEqual({ _id: 'upd' })
    expect(mockMovieModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { title: 'Upd' },
      { new: true }
    )
    expect(mockMovieModel.findByIdAndUpdate().populate).toHaveBeenNthCalledWith(
      1,
      'director'
    )
    expect(mockMovieModel.findByIdAndUpdate().populate).toHaveBeenNthCalledWith(
      2,
      'actors'
    )
    expect(mockMovieModel.findByIdAndUpdate().populate).toHaveBeenNthCalledWith(
      3,
      'country'
    )
    expect(mockMovieModel.findByIdAndUpdate().populate).toHaveBeenNthCalledWith(
      4,
      'genres'
    )
  })

  it('removeMovie should call findByIdAndDelete', async () => {
    const res = await service.removeMovie('m1' as any)
    expect(res).toEqual({ acknowledged: true })
    expect(mockMovieModel.findByIdAndDelete).toHaveBeenCalledWith('m1')
  })
})
