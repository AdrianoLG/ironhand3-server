/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing'

import { CountryResolver } from './country.resolver'
import { CountryService } from './country.service'

describe('CountryResolver', () => {
  let resolver: CountryResolver
  let service: CountryService

  const mockService = {
    createCountry: jest.fn(),
    findAllCountries: jest.fn(),
    getCountryById: jest.fn(),
    updateCountry: jest.fn(),
    removeCountry: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryResolver,
        { provide: CountryService, useValue: mockService }
      ]
    }).compile()

    resolver = module.get<CountryResolver>(CountryResolver)
    service = module.get<CountryService>(CountryService)
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('createCountry should delegate to service', async () => {
    const input = { name: 'Spain', slug: 'spain' } as any
    const created = { _id: 'c1', ...input }
    ;(service.createCountry as jest.Mock).mockResolvedValue(created)

    const result = await resolver.createCountry(input)

    expect(service.createCountry).toHaveBeenCalledWith(input)
    expect(result).toEqual(created)
  })

  it('findAll should return countries from service', async () => {
    const list = [{ _id: 'c1', name: 'Spain' }]
    ;(service.findAllCountries as jest.Mock).mockResolvedValue(list)

    const result = await resolver.findAll()

    expect(service.findAllCountries).toHaveBeenCalled()
    expect(result).toEqual(list)
  })

  it('findOne should fetch country by id', async () => {
    const country = { _id: 'c9', name: 'Italy' }
    ;(service.getCountryById as jest.Mock).mockResolvedValue(country)

    const result = await resolver.findOne('c9' as any)

    expect(service.getCountryById).toHaveBeenCalledWith('c9')
    expect(result).toEqual(country)
  })

  it('updateCountry should use _id from input', async () => {
    const input = { _id: 'u1', name: 'Portugal' } as any
    const updated = { _id: 'u1', name: 'Portugal' }
    ;(service.updateCountry as jest.Mock).mockResolvedValue(updated)

    const result = await resolver.updateCountry(input)

    expect(service.updateCountry).toHaveBeenCalledWith('u1', input)
    expect(result).toEqual(updated)
  })

  it('removeCountry should delegate to service', async () => {
    const removed = { _id: 'r1' }
    ;(service.removeCountry as jest.Mock).mockResolvedValue(removed)

    const result = await resolver.removeCountry('r1' as any)

    expect(service.removeCountry).toHaveBeenCalledWith('r1')
    expect(result).toEqual(removed)
  })
})
