/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing';

import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

describe('TaskResolver', () => {
  let resolver: TaskResolver

  let service: TaskService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskResolver,
        {
          provide: TaskService,
          useValue: {
            createTask: jest.fn(),
            findAllTasks: jest.fn(),
            getTaskById: jest.fn(),
            updateTask: jest.fn(),
            removeTask: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<TaskResolver>(TaskResolver)
    service = module.get<TaskService>(TaskService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('findAll should return from service', async () => {
    const tasks = [{ _id: 't1', title: 'A' }] as any
    ;(service.findAllTasks as jest.Mock).mockResolvedValue(tasks)
    const result = await resolver.findAll()
    expect(result).toEqual(tasks)
    expect(service.findAllTasks).toHaveBeenCalled()
  })

  it('findOne should delegate', async () => {
    const task = { _id: 'tx', title: 'B' } as any
    ;(service.getTaskById as jest.Mock).mockResolvedValue(task)
    const result = await resolver.findOne('tx' as any)
    expect(result).toEqual(task)
    expect(service.getTaskById).toHaveBeenCalledWith('tx')
  })

  it('createTask should delegate', async () => {
    const input = { title: 'New', project: 'p1' } as any
    const created = { _id: 'n1', ...input } as any
    ;(service.createTask as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createTask(input)
    expect(result).toEqual(created)
    expect(service.createTask).toHaveBeenCalledWith(input)
  })

  it('updateTask should delegate', async () => {
    const update = { _id: 'u1', title: 'Upd' } as any
    const updated = { _id: 'u1', title: 'Upd' } as any
    ;(service.updateTask as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateTask(update)
    expect(result).toEqual(updated)
    expect(service.updateTask).toHaveBeenCalledWith('u1', update)
  })

  it('removeTask should delegate', async () => {
    const removed = { _id: 'del1' } as any
    ;(service.removeTask as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeTask('del1' as any)
    expect(result).toEqual(removed)
    expect(service.removeTask).toHaveBeenCalledWith('del1')
  })
})
