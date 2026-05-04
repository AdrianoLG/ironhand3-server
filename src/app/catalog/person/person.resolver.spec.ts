/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing'

import { PersonResolver } from './person.resolver'
import { PersonService } from './person.service'

describe('PersonResolver', () => {
  let resolver: PersonResolver
  let service: PersonService

  const mockService = {
    createPerson: jest.fn(),
    findAllPeople: jest.fn(),
    getPersonById: jest.fn(),
    updatePerson: jest.fn(),
    removePerson: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersonResolver,
        { provide: PersonService, useValue: mockService }
      ]
    }).compile()

    resolver = module.get<PersonResolver>(PersonResolver)
    service = module.get<PersonService>(PersonService)
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('createPerson should delegate to service', async () => {
    const input = { name: 'Christopher', role: 'director' } as any
    const created = { _id: 'p1', ...input }
    ;(service.createPerson as jest.Mock).mockResolvedValue(created)

    const result = await resolver.createPerson(input)

    expect(service.createPerson).toHaveBeenCalledWith(input)
    expect(result).toEqual(created)
  })

  it('findAll should return people from service', async () => {
    const list = [{ _id: 'p1', name: 'Hans' }]
    ;(service.findAllPeople as jest.Mock).mockResolvedValue(list)

    const result = await resolver.findAll()

    expect(service.findAllPeople).toHaveBeenCalled()
    expect(result).toEqual(list)
  })

  it('findOne should fetch person by id', async () => {
    const person = { _id: 'p9', name: 'Leonardo' }
    ;(service.getPersonById as jest.Mock).mockResolvedValue(person)

    const result = await resolver.findOne('p9' as any)

    expect(service.getPersonById).toHaveBeenCalledWith('p9')
    expect(result).toEqual(person)
  })

  it('updatePerson should use _id from input', async () => {
    const input = { _id: 'u1', name: 'Updated Person' } as any
    const updated = { _id: 'u1', name: 'Updated Person' }
    ;(service.updatePerson as jest.Mock).mockResolvedValue(updated)

    const result = await resolver.updatePerson(input)

    expect(service.updatePerson).toHaveBeenCalledWith('u1', input)
    expect(result).toEqual(updated)
  })

  it('removePerson should delegate to service', async () => {
    const removed = { _id: 'r1' }
    ;(service.removePerson as jest.Mock).mockResolvedValue(removed)

    const result = await resolver.removePerson('r1' as any)

    expect(service.removePerson).toHaveBeenCalledWith('r1')
    expect(result).toEqual(removed)
  })
})
