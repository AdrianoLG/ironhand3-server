import { Test, TestingModule } from '@nestjs/testing'

import { CompletedCleaningTasksResolver } from './completed-cleaning-tasks.resolver'
import { CompletedCleaningTasksService } from './completed-cleaning-tasks.service'

describe('CompletedCleaningTasksResolver', () => {
  let resolver: CompletedCleaningTasksResolver

  let service: CompletedCleaningTasksService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompletedCleaningTasksResolver,
        {
          provide: CompletedCleaningTasksService,
          useValue: {
            createCompletedCleaningTask: jest.fn(),
            findAllCompletedCleaningTasks: jest.fn(),
            getCompletedCleaningTaskById: jest.fn(),
            updateCompletedCleaningTask: jest.fn(),
            removeCompletedCleaningTask: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<CompletedCleaningTasksResolver>(
      CompletedCleaningTasksResolver
    )
    service = module.get<CompletedCleaningTasksService>(
      CompletedCleaningTasksService
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('findAll should return from service', async () => {
    const items = [{ _id: 'c1' }] as any
    ;(service.findAllCompletedCleaningTasks as jest.Mock).mockResolvedValue(
      items
    )
    const result = await resolver.findAll()
    expect(result).toEqual(items)
    expect(service.findAllCompletedCleaningTasks).toHaveBeenCalled()
  })

  it('get by id should delegate', async () => {
    const item = { _id: 'c1' } as any
    ;(service.getCompletedCleaningTaskById as jest.Mock).mockResolvedValue(item)
    const result = await resolver.getCompletedCleaningTaskById('c1' as any)
    expect(result).toEqual(item)
    expect(service.getCompletedCleaningTaskById).toHaveBeenCalledWith('c1')
  })

  it('create should delegate', async () => {
    const input = { task: 'X' } as any
    const created = { _id: 'n1', ...input } as any
    ;(service.createCompletedCleaningTask as jest.Mock).mockResolvedValue(
      created
    )
    const result = await resolver.createCompletedCleaningTask(input)
    expect(result).toEqual(created)
    expect(service.createCompletedCleaningTask).toHaveBeenCalledWith(input)
  })

  it('update should delegate', async () => {
    const update = { _id: 'u1', task: 'Upd' } as any
    const updated = { _id: 'u1', task: 'Upd' } as any
    ;(service.updateCompletedCleaningTask as jest.Mock).mockResolvedValue(
      updated
    )
    const result = await resolver.updateCompletedCleaningTask(update)
    expect(result).toEqual(updated)
    expect(service.updateCompletedCleaningTask).toHaveBeenCalledWith(
      'u1',
      update
    )
  })

  it('remove should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeCompletedCleaningTask as jest.Mock).mockResolvedValue(
      removed
    )
    const result = await resolver.removeCompletedCleaningTask('r1' as any)
    expect(result).toEqual(removed)
    expect(service.removeCompletedCleaningTask).toHaveBeenCalledWith('r1')
  })
})
