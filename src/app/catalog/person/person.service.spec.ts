/// <reference types="jest" />
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { PersonService } from './person.service'

describe('PersonService', () => {
  let service: PersonService
  let mockPersonModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockPersonModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newPerson',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newPerson', ...dto })
    }))

    const findExec = jest.fn().mockResolvedValue([{ _id: 'p1' }])
    const findChain = {
      sort: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      exec: findExec
    }

    const findByIdExec = jest.fn().mockResolvedValue({ _id: 'pid' })
    const findByIdChain = {
      populate: jest.fn().mockReturnThis(),
      exec: findByIdExec
    }

    const updateExec = jest.fn().mockResolvedValue({ _id: 'upd' })
    const updateChain = {
      populate: jest.fn().mockReturnThis(),
      exec: updateExec
    }

    mockPersonModel.find = jest.fn().mockReturnValue(findChain)
    mockPersonModel.findById = jest.fn().mockReturnValue(findByIdChain)
    mockPersonModel.findByIdAndUpdate = jest.fn().mockReturnValue(updateChain)
    mockPersonModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonService,
        { provide: getModelToken('Person'), useValue: mockPersonModel }
      ]
    }).compile()

    service = module.get<PersonService>(PersonService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createPerson should create and save', async () => {
    const res = await service.createPerson({ name: 'Nolan' } as any)
    expect(res).toEqual({ _id: 'newPerson', name: 'Nolan' })
    expect(mockPersonModel).toHaveBeenCalledWith({ name: 'Nolan' })
  })

  it('findAllPeople should sort and populate birthCountry', async () => {
    const res = await service.findAllPeople()
    expect(res).toEqual([{ _id: 'p1' }])
    expect(mockPersonModel.find).toHaveBeenCalled()
    expect(mockPersonModel.find().sort).toHaveBeenCalledWith({
      name: 1,
      lastName: 1
    })
    expect(mockPersonModel.find().populate).toHaveBeenCalledWith('birthCountry')
  })

  it('getPersonById should call findById and populate birthCountry', async () => {
    const res = await service.getPersonById('id' as any)
    expect(res).toEqual({ _id: 'pid' })
    expect(mockPersonModel.findById).toHaveBeenCalledWith('id')
    expect(mockPersonModel.findById().populate).toHaveBeenCalledWith(
      'birthCountry'
    )
  })

  it('updatePerson should call findByIdAndUpdate and populate birthCountry', async () => {
    const res = await service.updatePerson('u1' as any, { name: 'Upd' } as any)
    expect(res).toEqual({ _id: 'upd' })
    expect(mockPersonModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { name: 'Upd' },
      { new: true }
    )
    expect(mockPersonModel.findByIdAndUpdate().populate).toHaveBeenCalledWith(
      'birthCountry'
    )
  })

  it('removePerson should call findByIdAndDelete', async () => {
    const res = await service.removePerson('p1' as any)
    expect(res).toEqual({ acknowledged: true })
    expect(mockPersonModel.findByIdAndDelete).toHaveBeenCalledWith('p1')
  })
})
