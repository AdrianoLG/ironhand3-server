import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { Specie } from './entities/specie.entity'
import { SpecieService } from './specie.service'

describe('SpecieService', () => {
  let service: SpecieService

  let mockModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newSpecie',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newSpecie', ...dto })
    }))

    mockModel.find = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([{ _id: 's1' }])
    })
    mockModel.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: 's1' })
    })
    mockModel.findByIdAndUpdate = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: 's2' })
    })
    mockModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpecieService,
        {
          provide: getModelToken(Specie.name),
          useValue: mockModel
        }
      ]
    }).compile()

    service = module.get<SpecieService>(SpecieService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createSpecie should save', async () => {
    const input = { name: 'Monstera' } as any
    const result = await service.createSpecie(input)
    expect(result).toEqual({ _id: 'newSpecie', name: 'Monstera' })
    expect(mockModel).toHaveBeenCalledWith(input)
  })

  it('findAllSpecies should call find().exec()', async () => {
    const result = await service.findAllSpecies()
    expect(result).toEqual([{ _id: 's1' }])
    expect(mockModel.find).toHaveBeenCalled()
  })

  it('getSpecieById should call findById(id).exec()', async () => {
    const result = await service.getSpecieById('id1' as any)
    expect(result).toEqual({ _id: 's1' })
    expect(mockModel.findById).toHaveBeenCalledWith('id1')
  })

  it('updateSpecie should call findByIdAndUpdate with new:true', async () => {
    const update = { _id: 'id1', name: 'Updated' } as any
    const result = await service.updateSpecie('id1' as any, update)
    expect(result).toEqual({ _id: 's2' })
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith('id1', update, {
      new: true
    })
  })

  it('removeSpecie should call findByIdAndDelete(id).exec()', async () => {
    const result = await service.removeSpecie('id1' as any)
    expect(result).toEqual({ acknowledged: true })
    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('id1')
  })
})
