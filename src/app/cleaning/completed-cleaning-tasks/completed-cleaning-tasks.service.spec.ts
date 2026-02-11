import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { CompletedCleaningTasksService } from './completed-cleaning-tasks.service'

describe('CompletedCleaningTasksService', () => {
  let service: CompletedCleaningTasksService

  let mockModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newCCT',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newCCT', ...dto })
    }))
    const findChain = {
      sort: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([{ _id: 'cct1' }])
    }
    mockModel.find = jest.fn().mockReturnValue(findChain)
    const findByIdChain = {
      sort: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ _id: 'cid' })
    }
    mockModel.findById = jest.fn().mockReturnValue(findByIdChain)
    const findByIdAndUpdateExec = jest.fn()
    mockModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue({ exec: findByIdAndUpdateExec })
    mockModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompletedCleaningTasksService,
        { provide: getModelToken('CompletedCleaningTask'), useValue: mockModel }
      ]
    }).compile()

    service = module.get<CompletedCleaningTasksService>(
      CompletedCleaningTasksService
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createCompletedCleaningTask should save', async () => {
    const res = await service.createCompletedCleaningTask({ task: 'X' } as any)
    expect(res).toEqual({ _id: 'newCCT', task: 'X' })
    expect(mockModel).toHaveBeenCalledWith({ task: 'X' })
  })

  it('findAllCompletedCleaningTasks should sort and populate', async () => {
    const res = await service.findAllCompletedCleaningTasks()
    expect(res).toEqual([{ _id: 'cct1' }])
    expect(mockModel.find).toHaveBeenCalled()
  })

  it('getCompletedCleaningTaskById should populate', async () => {
    const res = await service.getCompletedCleaningTaskById('id' as any)
    expect(res).toEqual({ _id: 'cid' })
    expect(mockModel.findById).toHaveBeenCalledWith('id')
  })

  it('updateCompletedCleaningTask should throw if not found', async () => {
    // Make exec resolve to null to simulate not found
    ;(mockModel.findByIdAndUpdate().exec as jest.Mock).mockResolvedValueOnce(
      null
    )
    await expect(
      service.updateCompletedCleaningTask('u1' as any, { task: 'Upd' } as any)
    ).rejects.toThrow(/not found/)
  })

  it('updateCompletedCleaningTask should return updated', async () => {
    ;(mockModel.findByIdAndUpdate().exec as jest.Mock).mockResolvedValueOnce({
      _id: 'upd'
    })
    const res = await service.updateCompletedCleaningTask(
      'u1' as any,
      { task: 'Upd' } as any
    )
    expect(res).toEqual({ _id: 'upd' })
  })

  it('removeCompletedCleaningTask should delete', async () => {
    const res = await service.removeCompletedCleaningTask('r1' as any)
    expect(res).toEqual({ acknowledged: true })
    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('r1')
  })
})
