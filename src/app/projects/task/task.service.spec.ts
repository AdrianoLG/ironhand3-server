/// <reference types="jest" />
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService

  let mockTaskModel: any
  let mockProjectModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockTaskModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newTask',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newTask', ...dto })
    }))

    const findChain = {
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([{ _id: 't1' }])
    }
    mockTaskModel.find = jest.fn().mockReturnValue(findChain)

    const findByIdChain = {
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ _id: 'tid', project: 'p1' })
    }
    mockTaskModel.findById = jest.fn().mockReturnValue(findByIdChain)

    const findByIdAndUpdateChain = {
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ _id: 'upd', project: 'p2' })
    }
    mockTaskModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue(findByIdAndUpdateChain)

    mockTaskModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: 'del', project: 'p1' })
    })

    mockProjectModel = {
      findById: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ _id: 'p1' })
      }),
      findByIdAndUpdate: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ _id: 'p1' })
      }),
      updateMany: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ modifiedCount: 1 })
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: getModelToken('Task'), useValue: mockTaskModel },
        { provide: getModelToken('Project'), useValue: mockProjectModel }
      ]
    }).compile()

    service = module.get<TaskService>(TaskService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createTask should throw when project does not exist', async () => {
    mockProjectModel.findById.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null)
    })

    await expect(
      service.createTask({ title: 'Task', project: 'missing' as any } as any)
    ).rejects.toThrow(/Project with id missing not found/)
  })

  it('createTask should save and add task to project', async () => {
    const res = await service.createTask({
      title: 'Task',
      project: 'p1' as any
    } as any)

    expect(res).toEqual({ _id: 'newTask', title: 'Task', project: 'p1' })
    expect(mockTaskModel).toHaveBeenCalledWith({ title: 'Task', project: 'p1' })
    expect(mockProjectModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'p1',
      { $addToSet: { tasks: 'newTask' } },
      { new: true }
    )
  })

  it('findAllTasks should return list', async () => {
    const res = await service.findAllTasks()
    expect(res).toEqual([{ _id: 't1' }])
    expect(mockTaskModel.find).toHaveBeenCalled()
  })

  it('getTaskById should call findById', async () => {
    const res = await service.getTaskById('id' as any)
    expect(res).toEqual({ _id: 'tid', project: 'p1' })
    expect(mockTaskModel.findById).toHaveBeenCalledWith('id')
  })

  it('updateTask should throw when target project does not exist', async () => {
    mockProjectModel.findById.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(null)
    })

    await expect(
      service.updateTask('u1' as any, { project: 'missing' as any } as any)
    ).rejects.toThrow(/Project with id missing not found/)
  })

  it('updateTask should move task between projects when project changes', async () => {
    await service.updateTask('u1' as any, { project: 'p2' as any } as any)

    expect(mockTaskModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { project: 'p2' },
      { new: true }
    )
    expect(mockProjectModel.findByIdAndUpdate).toHaveBeenNthCalledWith(
      1,
      'p1',
      { $pull: { tasks: 'u1' } }
    )
    expect(mockProjectModel.findByIdAndUpdate).toHaveBeenNthCalledWith(
      2,
      'p2',
      { $addToSet: { tasks: 'u1' } }
    )
  })

  it('removeTask should delete and remove links', async () => {
    const res = await service.removeTask('r1' as any)

    expect(res).toEqual({ _id: 'del', project: 'p1' })
    expect(mockTaskModel.findByIdAndDelete).toHaveBeenCalledWith('r1')
    expect(mockProjectModel.findByIdAndUpdate).toHaveBeenCalledWith('p1', {
      $pull: { tasks: 'r1' }
    })
    expect(mockProjectModel.updateMany).toHaveBeenCalledWith(
      { tasks: 'r1' },
      { $pull: { tasks: 'r1' } }
    )
  })
})
