/// <reference types="jest" />
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { SerieService } from './serie.service'

describe('SerieService', () => {
  let service: SerieService
  let mockSerieModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockSerieModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newSerie',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newSerie', ...dto })
    }))

    const findExec = jest.fn().mockResolvedValue([{ _id: 's1' }])
    const findChain = {
      sort: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      exec: findExec
    }

    const findByIdExec = jest.fn().mockResolvedValue({ _id: 'sid' })
    const findByIdChain = {
      populate: jest.fn().mockReturnThis(),
      exec: findByIdExec
    }

    const updateExec = jest.fn().mockResolvedValue({ _id: 'upd' })
    const updateChain = {
      populate: jest.fn().mockReturnThis(),
      exec: updateExec
    }

    mockSerieModel.find = jest.fn().mockReturnValue(findChain)
    mockSerieModel.findById = jest.fn().mockReturnValue(findByIdChain)
    mockSerieModel.findByIdAndUpdate = jest.fn().mockReturnValue(updateChain)
    mockSerieModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SerieService,
        { provide: getModelToken('Serie'), useValue: mockSerieModel }
      ]
    }).compile()

    service = module.get<SerieService>(SerieService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createSerie should create and save', async () => {
    const res = await service.createSerie({ title: 'Dark' } as any)
    expect(res).toEqual({ _id: 'newSerie', title: 'Dark' })
    expect(mockSerieModel).toHaveBeenCalledWith({ title: 'Dark' })
  })

  it('findAllSeries should sort and populate relations', async () => {
    const res = await service.findAllSeries()
    expect(res).toEqual([{ _id: 's1' }])
    expect(mockSerieModel.find).toHaveBeenCalled()
    expect(mockSerieModel.find().sort).toHaveBeenCalledWith({ title: 1 })
    expect(mockSerieModel.find().populate).toHaveBeenNthCalledWith(
      1,
      'director'
    )
    expect(mockSerieModel.find().populate).toHaveBeenNthCalledWith(2, 'actors')
    expect(mockSerieModel.find().populate).toHaveBeenNthCalledWith(3, 'country')
    expect(mockSerieModel.find().populate).toHaveBeenNthCalledWith(4, 'genres')
  })

  it('getSerieById should call findById and populate relations', async () => {
    const res = await service.getSerieById('id' as any)
    expect(res).toEqual({ _id: 'sid' })
    expect(mockSerieModel.findById).toHaveBeenCalledWith('id')
    expect(mockSerieModel.findById().populate).toHaveBeenNthCalledWith(
      1,
      'director'
    )
    expect(mockSerieModel.findById().populate).toHaveBeenNthCalledWith(
      2,
      'actors'
    )
    expect(mockSerieModel.findById().populate).toHaveBeenNthCalledWith(
      3,
      'country'
    )
    expect(mockSerieModel.findById().populate).toHaveBeenNthCalledWith(
      4,
      'genres'
    )
  })

  it('updateSerie should call findByIdAndUpdate and populate relations', async () => {
    const res = await service.updateSerie('u1' as any, { title: 'Upd' } as any)
    expect(res).toEqual({ _id: 'upd' })
    expect(mockSerieModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { title: 'Upd' },
      { new: true }
    )
    expect(mockSerieModel.findByIdAndUpdate().populate).toHaveBeenNthCalledWith(
      1,
      'director'
    )
    expect(mockSerieModel.findByIdAndUpdate().populate).toHaveBeenNthCalledWith(
      2,
      'actors'
    )
    expect(mockSerieModel.findByIdAndUpdate().populate).toHaveBeenNthCalledWith(
      3,
      'country'
    )
    expect(mockSerieModel.findByIdAndUpdate().populate).toHaveBeenNthCalledWith(
      4,
      'genres'
    )
  })

  it('removeSerie should call findByIdAndDelete', async () => {
    const res = await service.removeSerie('s1' as any)
    expect(res).toEqual({ acknowledged: true })
    expect(mockSerieModel.findByIdAndDelete).toHaveBeenCalledWith('s1')
  })
})
