import { Schema as MongooseSchema, Types } from 'mongoose'

import { Test, TestingModule } from '@nestjs/testing'

import { CleaningTasksResolver } from './cleaning-tasks.resolver'
import { CleaningTasksService } from './cleaning-tasks.service'
import { CreateCleaningTaskInput } from './dto/create-cleaning-task.input'
import { UpdateCleaningTaskInput } from './dto/update-cleaning-task.input'

describe('CleaningTasksResolver', () => {
  let resolver: CleaningTasksResolver
  let service: CleaningTasksService

  const mockService = {
    createCleaningTask: jest.fn(),
    findAllCleaningTasks: jest.fn(),
    getCleaningTaskById: jest.fn(),
    updateCleaningTask: jest.fn(),
    removeCleaningTask: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CleaningTasksResolver,
        { provide: CleaningTasksService, useValue: mockService }
      ]
    }).compile()

    resolver = module.get<CleaningTasksResolver>(CleaningTasksResolver)
    service = module.get<CleaningTasksService>(CleaningTasksService)

    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('createCleaningTask should delegate to service and return result', async () => {
    const dto: CreateCleaningTaskInput = {
      name: 'Vacuum',
      slug: 'vacuum',
      img: 'vacuum.png',
      possibleRooms: []
    }
    const created = { _id: new Types.ObjectId(), ...dto }
    ;(service.createCleaningTask as jest.Mock).mockResolvedValue(created)

    const result = await resolver.createCleaningTask(dto)

    expect(service.createCleaningTask).toHaveBeenCalledWith(dto)
    expect(result).toEqual(created)
  })

  it('findAll should return list from service', async () => {
    const list = [
      {
        _id: new Types.ObjectId(),
        name: 'Dust',
        slug: 'dust',
        img: 'dust.png'
      }
    ]
    ;(service.findAllCleaningTasks as jest.Mock).mockResolvedValue(list)

    const result = await resolver.findAll()

    expect(service.findAllCleaningTasks).toHaveBeenCalled()
    expect(result).toEqual(list)
  })

  it('findOne should fetch by id via service', async () => {
    const id = new Types.ObjectId() as unknown as MongooseSchema.Types.ObjectId
    const entity = {
      _id: id,
      name: 'Dishes',
      slug: 'dishes',
      img: 'dishes.png'
    }
    ;(service.getCleaningTaskById as jest.Mock).mockResolvedValue(entity)

    const result = await resolver.findOne(id)

    expect(service.getCleaningTaskById).toHaveBeenCalledWith(id)
    expect(result).toEqual(entity)
  })

  it('updateCleaningTask should use input _id and delegate', async () => {
    const id = new Types.ObjectId() as unknown as MongooseSchema.Types.ObjectId
    const dto: UpdateCleaningTaskInput = {
      _id: id,
      name: 'Dishes updated',
      slug: 'dishes',
      img: 'dishes2.png',
      possibleRooms: []
    }
    const updated = {
      _id: id,
      name: 'Dishes updated',
      slug: 'dishes',
      img: 'dishes2.png'
    }
    ;(service.updateCleaningTask as jest.Mock).mockResolvedValue(updated)

    const result = await resolver.updateCleaningTask(dto)

    expect(service.updateCleaningTask).toHaveBeenCalledWith(id, dto)
    expect(result).toEqual(updated)
  })

  it('removeCleaningTask should call service with id', async () => {
    const id = new Types.ObjectId() as unknown as MongooseSchema.Types.ObjectId
    const removed = { _id: id }
    ;(service.removeCleaningTask as jest.Mock).mockResolvedValue(removed)

    const result = await resolver.removeCleaningTask(id)

    expect(service.removeCleaningTask).toHaveBeenCalledWith(id)
    expect(result).toEqual(removed)
  })
})
