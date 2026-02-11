import { Test, TestingModule } from '@nestjs/testing'

import { ExerciseResolver } from './exercise.resolver'
import { ExerciseService } from './exercise.service'

describe('ExerciseResolver', () => {
  let resolver: ExerciseResolver

  let service: ExerciseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExerciseResolver,
        {
          provide: ExerciseService,
          useValue: {
            createExercise: jest.fn(),
            findAllExercises: jest.fn(),
            getExerciseById: jest.fn(),
            updateExercise: jest.fn(),
            removeExercise: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<ExerciseResolver>(ExerciseResolver)
    service = module.get<ExerciseService>(ExerciseService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('findAll should return from service', async () => {
    const exercises = [{ _id: 'e1', name: 'Pushup' }] as any
    ;(service.findAllExercises as jest.Mock).mockResolvedValue(exercises)
    const result = await resolver.findAll()
    expect(result).toEqual(exercises)
    expect(service.findAllExercises).toHaveBeenCalled()
  })

  it('findOne should delegate', async () => {
    const exercise = { _id: 'ex', name: 'Squat' } as any
    ;(service.getExerciseById as jest.Mock).mockResolvedValue(exercise)
    const result = await resolver.findOne('ex' as any)
    expect(result).toEqual(exercise)
    expect(service.getExerciseById).toHaveBeenCalledWith('ex')
  })

  it('createExercise should delegate', async () => {
    const input = { name: 'New' } as any
    const created = { _id: 'n1', ...input } as any
    ;(service.createExercise as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createExercise(input)
    expect(result).toEqual(created)
    expect(service.createExercise).toHaveBeenCalledWith(input)
  })

  it('updateExercise should delegate', async () => {
    const update = { _id: 'u1', name: 'Upd' } as any
    const updated = { _id: 'u1', name: 'Upd' } as any
    ;(service.updateExercise as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateExercise(update)
    expect(result).toEqual(updated)
    expect(service.updateExercise).toHaveBeenCalledWith('u1', update)
  })

  it('removeExercise should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeExercise as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeExercise('del1' as any)
    expect(result).toEqual(removed)
    expect(service.removeExercise).toHaveBeenCalledWith('del1')
  })
})
