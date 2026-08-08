/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing';

import { ProjectResolver } from './project.resolver';
import { ProjectService } from './project.service';

describe('ProjectResolver', () => {
  let resolver: ProjectResolver

  let service: ProjectService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectResolver,
        {
          provide: ProjectService,
          useValue: {
            createProject: jest.fn(),
            findAllProjects: jest.fn(),
            getProjectById: jest.fn(),
            updateProject: jest.fn(),
            removeProject: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<ProjectResolver>(ProjectResolver)
    service = module.get<ProjectService>(ProjectService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('findAll should return from service', async () => {
    const projects = [{ _id: 'p1', title: 'A' }] as any
    ;(service.findAllProjects as jest.Mock).mockResolvedValue(projects)
    const result = await resolver.findAll()
    expect(result).toEqual(projects)
    expect(service.findAllProjects).toHaveBeenCalled()
  })

  it('findOne should delegate', async () => {
    const project = { _id: 'px', title: 'B' } as any
    ;(service.getProjectById as jest.Mock).mockResolvedValue(project)
    const result = await resolver.findOne('px' as any)
    expect(result).toEqual(project)
    expect(service.getProjectById).toHaveBeenCalledWith('px')
  })

  it('createProject should delegate', async () => {
    const input = { title: 'New', category: 'work' } as any
    const created = { _id: 'n1', ...input } as any
    ;(service.createProject as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createProject(input)
    expect(result).toEqual(created)
    expect(service.createProject).toHaveBeenCalledWith(input)
  })

  it('updateProject should delegate', async () => {
    const update = { _id: 'u1', title: 'Upd' } as any
    const updated = { _id: 'u1', title: 'Upd' } as any
    ;(service.updateProject as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateProject(update)
    expect(result).toEqual(updated)
    expect(service.updateProject).toHaveBeenCalledWith('u1', update)
  })

  it('removeProject should delegate', async () => {
    const removed = { _id: 'del1' } as any
    ;(service.removeProject as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeProject('del1' as any)
    expect(result).toEqual(removed)
    expect(service.removeProject).toHaveBeenCalledWith('del1')
  })
})
