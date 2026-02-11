import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { CompletedExerciseService } from './completed-exercise.service'

describe('CompletedExerciseService', () => {
  let service: CompletedExerciseService

  let mockModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newCE',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newCE', ...dto })
    }))
    const findChain = {
      sort: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([{ _id: 'ce1' }])
    }
    mockModel.find = jest.fn().mockReturnValue(findChain)
    const findByIdChain = {
      sort: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ _id: 'cid' })
    }
    mockModel.findById = jest.fn().mockReturnValue(findByIdChain)
    mockModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'upd' }) })
    mockModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompletedExerciseService,
        { provide: getModelToken('CompletedExercise'), useValue: mockModel }
      ]
    }).compile()

    service = module.get<CompletedExerciseService>(CompletedExerciseService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createCompletedExercise should save', async () => {
    const res = await service.createCompletedExercise({ exercise: 'e1' } as any)
    expect(res).toEqual({ _id: 'newCE', exercise: 'e1' })
    expect(mockModel).toHaveBeenCalledWith({ exercise: 'e1' })
  })

  it('findAllCompletedExercises should sort and populate', async () => {
    const res = await service.findAllCompletedExercises()
    expect(res).toEqual([{ _id: 'ce1' }])
    expect(mockModel.find).toHaveBeenCalled()
  })

  it('getCompletedExerciseById should populate', async () => {
    const res = await service.getCompletedExerciseById('id' as any)
    expect(res).toEqual({ _id: 'cid' })
    expect(mockModel.findById).toHaveBeenCalledWith('id')
  })

  it('updateCompletedExercise should call findByIdAndUpdate', async () => {
    const res = await service.updateCompletedExercise(
      'u1' as any,
      { notes: 'Upd' } as any
    )
    expect(res).toEqual({ _id: 'upd' })
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { notes: 'Upd' },
      { new: true }
    )
  })

  it('removeCompletedExercise should delete', async () => {
    const res = await service.removeCompletedExercise('r1' as any)
    expect(res).toEqual({ acknowledged: true })
    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('r1')
  })
})
