/// <reference types="jest" />
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { GenreService } from './genre.service'

describe('GenreService', () => {
  let service: GenreService
  let mockGenreModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockGenreModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newGenre',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newGenre', ...dto })
    }))

    const findExec = jest.fn().mockResolvedValue([{ _id: 'g1' }])
    const findChain = {
      sort: jest.fn().mockReturnThis(),
      exec: findExec
    }

    mockGenreModel.find = jest.fn().mockReturnValue(findChain)
    mockGenreModel.findById = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'gid' }) })
    mockGenreModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'upd' }) })
    mockGenreModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenreService,
        { provide: getModelToken('Genre'), useValue: mockGenreModel }
      ]
    }).compile()

    service = module.get<GenreService>(GenreService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createGenre should create and save', async () => {
    const res = await service.createGenre({ name: 'Drama' } as any)
    expect(res).toEqual({ _id: 'newGenre', name: 'Drama' })
    expect(mockGenreModel).toHaveBeenCalledWith({ name: 'Drama' })
  })

  it('findAllGenres should return list sorted by name', async () => {
    const res = await service.findAllGenres()
    expect(res).toEqual([{ _id: 'g1' }])
    expect(mockGenreModel.find).toHaveBeenCalled()
    expect(mockGenreModel.find().sort).toHaveBeenCalledWith({ name: 1 })
  })

  it('getGenreById should call findById', async () => {
    const res = await service.getGenreById('id' as any)
    expect(res).toEqual({ _id: 'gid' })
    expect(mockGenreModel.findById).toHaveBeenCalledWith('id')
  })

  it('updateGenre should call findByIdAndUpdate', async () => {
    const res = await service.updateGenre('u1' as any, { name: 'Upd' } as any)
    expect(res).toEqual({ _id: 'upd' })
    expect(mockGenreModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { name: 'Upd' },
      { new: true }
    )
  })

  it('removeGenre should call findByIdAndDelete', async () => {
    const res = await service.removeGenre('g1' as any)
    expect(res).toEqual({ acknowledged: true })
    expect(mockGenreModel.findByIdAndDelete).toHaveBeenCalledWith('g1')
  })
})
