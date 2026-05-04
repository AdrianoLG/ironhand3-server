/// <reference types="jest" />
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { CountryService } from './country.service'

describe('CountryService', () => {
  let service: CountryService
  let mockCountryModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockCountryModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newCountry',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newCountry', ...dto })
    }))

    const findExec = jest.fn().mockResolvedValue([{ _id: 'c1' }])
    const findChain = {
      sort: jest.fn().mockReturnThis(),
      exec: findExec
    }

    mockCountryModel.find = jest.fn().mockReturnValue(findChain)
    mockCountryModel.findById = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'cid' }) })
    mockCountryModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'upd' }) })
    mockCountryModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        { provide: getModelToken('Country'), useValue: mockCountryModel }
      ]
    }).compile()

    service = module.get<CountryService>(CountryService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createCountry should create and save', async () => {
    const res = await service.createCountry({ name: 'Spain' } as any)
    expect(res).toEqual({ _id: 'newCountry', name: 'Spain' })
    expect(mockCountryModel).toHaveBeenCalledWith({ name: 'Spain' })
  })

  it('findAllCountries should return list sorted by name', async () => {
    const res = await service.findAllCountries()
    expect(res).toEqual([{ _id: 'c1' }])
    expect(mockCountryModel.find).toHaveBeenCalled()
    expect(mockCountryModel.find().sort).toHaveBeenCalledWith({ name: 1 })
  })

  it('getCountryById should call findById', async () => {
    const res = await service.getCountryById('id' as any)
    expect(res).toEqual({ _id: 'cid' })
    expect(mockCountryModel.findById).toHaveBeenCalledWith('id')
  })

  it('updateCountry should call findByIdAndUpdate', async () => {
    const res = await service.updateCountry('u1' as any, { name: 'Upd' } as any)
    expect(res).toEqual({ _id: 'upd' })
    expect(mockCountryModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { name: 'Upd' },
      { new: true }
    )
  })

  it('removeCountry should call findByIdAndDelete', async () => {
    const res = await service.removeCountry('c1' as any)
    expect(res).toEqual({ acknowledged: true })
    expect(mockCountryModel.findByIdAndDelete).toHaveBeenCalledWith('c1')
  })
})
