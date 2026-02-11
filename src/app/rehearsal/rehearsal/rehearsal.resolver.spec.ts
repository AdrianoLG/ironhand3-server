import { Test, TestingModule } from '@nestjs/testing'

import { RehearsalResolver } from './rehearsal.resolver'
import { RehearsalService } from './rehearsal.service'

describe('RehearsalResolver', () => {
  let resolver: RehearsalResolver

  let service: RehearsalService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RehearsalResolver,
        {
          provide: RehearsalService,
          useValue: {
            createRehearsal: jest.fn(),
            findAllRehearsals: jest.fn(),
            getRehearsalById: jest.fn(),
            updateRehearsal: jest.fn(),
            removeRehearsal: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<RehearsalResolver>(RehearsalResolver)
    service = module.get<RehearsalService>(RehearsalService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('findAll should return rehearsals from service', async () => {
    const rehearsals = [
      { _id: 'r1', completedAt: new Date() },
      { _id: 'r2', completedAt: new Date() }
    ] as any
    ;(service.findAllRehearsals as jest.Mock).mockResolvedValue(rehearsals)
    const result = await resolver.findAll()
    expect(result).toEqual(rehearsals)
    expect(service.findAllRehearsals).toHaveBeenCalled()
  })

  it('findOne should fetch rehearsal by id', async () => {
    const rehearsal = { _id: 'rx', completedAt: new Date() } as any
    ;(service.getRehearsalById as jest.Mock).mockResolvedValue(rehearsal)
    const result = await resolver.findOne('rx' as any)
    expect(result).toEqual(rehearsal)
    expect(service.getRehearsalById).toHaveBeenCalledWith('rx')
  })

  it('createRehearsal should delegate to service', async () => {
    const input = { instrument: 'i1', sheets: [] } as any
    const created = { _id: 'new', ...input } as any
    ;(service.createRehearsal as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createRehearsal(input)
    expect(result).toEqual(created)
    expect(service.createRehearsal).toHaveBeenCalledWith(input)
  })

  it('updateRehearsal should delegate to service', async () => {
    const update = { _id: 'u1', notes: 'upd' } as any
    const updated = { _id: 'u1', notes: 'upd' } as any
    ;(service.updateRehearsal as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateRehearsal(update)
    expect(result).toEqual(updated)
    expect(service.updateRehearsal).toHaveBeenCalledWith('u1', update)
  })

  it('removeRehearsal should delegate to service', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeRehearsal as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeRehearsal('del1' as any)
    expect(result).toEqual(removed)
    expect(service.removeRehearsal).toHaveBeenCalledWith('del1')
  })
})
