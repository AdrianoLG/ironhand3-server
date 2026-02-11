import { Test, TestingModule } from '@nestjs/testing'

import { CompletedExerciseResolver } from './completed-exercise.resolver'
import { CompletedExerciseService } from './completed-exercise.service'

describe('CompletedExerciseResolver', () => {
  let resolver: CompletedExerciseResolver

  let service: CompletedExerciseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompletedExerciseResolver,
        {
          provide: CompletedExerciseService,
          useValue: {
            createCompletedExercise: jest.fn(),
            findAllCompletedExercises: jest.fn(),
            getCompletedExerciseById: jest.fn(),
            updateCompletedExercise: jest.fn(),
            removeCompletedExercise: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<CompletedExerciseResolver>(CompletedExerciseResolver)
    service = module.get<CompletedExerciseService>(CompletedExerciseService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('findAll should return from service', async () => {
    const items = [{ _id: 'c1' }] as any
    ;(service.findAllCompletedExercises as jest.Mock).mockResolvedValue(items)
    const result = await resolver.findAll()
    expect(result).toEqual(items)
    expect(service.findAllCompletedExercises).toHaveBeenCalled()
  })

  it('findOne should delegate', async () => {
    const item = { _id: 'cx' } as any
    ;(service.getCompletedExerciseById as jest.Mock).mockResolvedValue(item)
    const result = await resolver.findOne('cx' as any)
    expect(result).toEqual(item)
    expect(service.getCompletedExerciseById).toHaveBeenCalledWith('cx')
  })

  it('create should delegate', async () => {
    const input = { exercise: 'X' } as any
    const created = { _id: 'n1', ...input } as any
    ;(service.createCompletedExercise as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createCompletedExercise(input)
    expect(result).toEqual(created)
    expect(service.createCompletedExercise).toHaveBeenCalledWith(input)
  })

  it('update should delegate', async () => {
    const update = { _id: 'u1', notes: 'Upd' } as any
    const updated = { _id: 'u1', notes: 'Upd' } as any
    ;(service.updateCompletedExercise as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateCompletedExercise(update)
    expect(result).toEqual(updated)
    expect(service.updateCompletedExercise).toHaveBeenCalledWith('u1', update)
  })

  it('remove should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeCompletedExercise as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeCompletedExercise('r1' as any)
    expect(result).toEqual(removed)
    expect(service.removeCompletedExercise).toHaveBeenCalledWith('r1')
  })
})
