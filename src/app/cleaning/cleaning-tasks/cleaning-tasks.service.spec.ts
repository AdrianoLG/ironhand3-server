import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { CleaningTasksService } from './cleaning-tasks.service'

describe('CleaningTasksService', () => {
  let service: CleaningTasksService

  let mockCleaningTaskModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockCleaningTaskModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newCT',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newCT', ...dto })
    }))
    const findChain = {
      sort: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([{ _id: 'ct1' }])
    }
    mockCleaningTaskModel.find = jest.fn().mockReturnValue(findChain)
    mockCleaningTaskModel.findById = jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ _id: 'cid' })
    })
    mockCleaningTaskModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'upd' }) })
    mockCleaningTaskModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CleaningTasksService,
        {
          provide: getModelToken('CleaningTask'),
          useValue: mockCleaningTaskModel
        }
      ]
    }).compile()

    service = module.get<CleaningTasksService>(CleaningTasksService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createCleaningTask should save', async () => {
    const res = await service.createCleaningTask({ name: 'X' } as any)
    expect(res).toEqual({ _id: 'newCT', name: 'X' })
    expect(mockCleaningTaskModel).toHaveBeenCalledWith({ name: 'X' })
  })

  it('findAllCleaningTasks should sort and populate', async () => {
    const res = await service.findAllCleaningTasks()
    expect(res).toEqual([{ _id: 'ct1' }])
    expect(mockCleaningTaskModel.find).toHaveBeenCalled()
  })

  it('getCleaningTaskById should populate', async () => {
    const res = await service.getCleaningTaskById('id' as any)
    expect(res).toEqual({ _id: 'cid' })
    expect(mockCleaningTaskModel.findById).toHaveBeenCalledWith('id')
  })

  it('updateCleaningTask should call findByIdAndUpdate', async () => {
    const res = await service.updateCleaningTask(
      'u1' as any,
      { name: 'Upd' } as any
    )
    expect(res).toEqual({ _id: 'upd' })
    expect(mockCleaningTaskModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { name: 'Upd' },
      { new: true }
    )
  })

  it('removeCleaningTask should call findByIdAndDelete', async () => {
    const res = await service.removeCleaningTask('r1' as any)
    expect(res).toEqual({ acknowledged: true })
    expect(mockCleaningTaskModel.findByIdAndDelete).toHaveBeenCalledWith('r1')
  })
})
