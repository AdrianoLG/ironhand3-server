import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { ExerciseService } from './exercise.service'

describe('ExerciseService', () => {
  let service: ExerciseService

  let mockExerciseModel: any
  let mockCompletedExerciseModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockExerciseModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newEx',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newEx', ...dto })
    }))
    mockExerciseModel.find = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue([{ _id: 'e1' }]) })
    mockExerciseModel.findById = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'eid' }) })
    mockExerciseModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'upd' }) })
    mockExerciseModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    mockCompletedExerciseModel = {
      deleteMany: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 2 })
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExerciseService,
        { provide: getModelToken('Exercise'), useValue: mockExerciseModel },
        {
          provide: getModelToken('CompletedExercise'),
          useValue: mockCompletedExerciseModel
        }
      ]
    }).compile()

    service = module.get<ExerciseService>(ExerciseService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createExercise should save when type valid', async () => {
    const res = await service.createExercise({
      type: 'cardio',
      name: 'Run'
    } as any)
    expect(res).toEqual({ _id: 'newEx', type: 'cardio', name: 'Run' })
    expect(mockExerciseModel).toHaveBeenCalled()
  })

  it('createExercise should throw when type invalid', async () => {
    await expect(
      service.createExercise({ type: 'invalid' } as any)
    ).rejects.toThrow(/Type must be one of/)
  })

  it('findAllExercises should return list', async () => {
    const res = await service.findAllExercises()
    expect(res).toEqual([{ _id: 'e1' }])
    expect(mockExerciseModel.find).toHaveBeenCalled()
  })

  it('getExerciseById should call findById', async () => {
    const res = await service.getExerciseById('id' as any)
    expect(res).toEqual({ _id: 'eid' })
    expect(mockExerciseModel.findById).toHaveBeenCalledWith('id')
  })

  it('updateExercise should call findByIdAndUpdate', async () => {
    const res = await service.updateExercise(
      'u1' as any,
      { name: 'Upd' } as any
    )
    expect(res).toEqual({ _id: 'upd' })
    expect(mockExerciseModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { name: 'Upd' },
      { new: true }
    )
  })

  it('removeExercise should delete exercise and related completed', async () => {
    const res = await service.removeExercise('r1' as any)
    expect(res).toEqual({ acknowledged: true })
    expect(mockExerciseModel.findByIdAndDelete).toHaveBeenCalledWith('r1')
    expect(mockCompletedExerciseModel.deleteMany).toHaveBeenCalledWith({
      exercise: 'r1'
    })
  })
})
