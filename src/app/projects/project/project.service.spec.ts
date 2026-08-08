/// <reference types="jest" />
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { ProjectService } from './project.service';

describe('ProjectService', () => {
  let service: ProjectService

  let mockProjectModel: any
  let mockTaskModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockProjectModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newProject',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newProject', ...dto })
    }))

    const findChain = {
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([{ _id: 'p1' }])
    }
    mockProjectModel.find = jest.fn().mockReturnValue(findChain)

    const findByIdChain = {
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ _id: 'pid' })
    }
    mockProjectModel.findById = jest.fn().mockReturnValue(findByIdChain)

    const findByIdAndUpdateChain = {
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ _id: 'upd' })
    }
    mockProjectModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue(findByIdAndUpdateChain)

    mockProjectModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: 'pdel' })
    })

    mockTaskModel = {
      deleteMany: jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 2 })
      })
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        { provide: getModelToken('Project'), useValue: mockProjectModel },
        { provide: getModelToken('Task'), useValue: mockTaskModel }
      ]
    }).compile()

    service = module.get<ProjectService>(ProjectService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createProject should save', async () => {
    const res = await service.createProject({
      title: 'P1',
      category: 'work'
    } as any)
    expect(res).toEqual({ _id: 'newProject', title: 'P1', category: 'work' })
    expect(mockProjectModel).toHaveBeenCalledWith({
      title: 'P1',
      category: 'work'
    })
  })

  it('findAllProjects should return list', async () => {
    const res = await service.findAllProjects()
    expect(res).toEqual([{ _id: 'p1' }])
    expect(mockProjectModel.find).toHaveBeenCalled()
  })

  it('getProjectById should call findById', async () => {
    const res = await service.getProjectById('id' as any)
    expect(res).toEqual({ _id: 'pid' })
    expect(mockProjectModel.findById).toHaveBeenCalledWith('id')
  })

  it('updateProject should call findByIdAndUpdate', async () => {
    const res = await service.updateProject(
      'u1' as any,
      { title: 'Upd' } as any
    )
    expect(res).toEqual({ _id: 'upd' })
    expect(mockProjectModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { title: 'Upd' },
      { new: true }
    )
  })

  it('removeProject should delete project and owned tasks', async () => {
    const res = await service.removeProject('r1' as any)
    expect(res).toEqual({ _id: 'pdel' })
    expect(mockProjectModel.findByIdAndDelete).toHaveBeenCalledWith('r1')
    expect(mockTaskModel.deleteMany).toHaveBeenCalledWith({ project: 'r1' })
  })
})
