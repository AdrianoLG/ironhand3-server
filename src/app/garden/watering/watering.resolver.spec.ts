import { Test, TestingModule } from '@nestjs/testing'

import { WateringResolver } from './watering.resolver'
import { WateringService } from './watering.service'

describe('WateringResolver', () => {
  let resolver: WateringResolver

  let service: WateringService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WateringResolver,
        {
          provide: WateringService,
          useValue: {
            createWatering: jest.fn(),
            findAllWaterings: jest.fn(),
            getWateringById: jest.fn(),
            updateWatering: jest.fn(),
            removeWatering: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<WateringResolver>(WateringResolver)
    service = module.get<WateringService>(WateringService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('createWatering should delegate', async () => {
    const input = { date: new Date('2020-01-01') } as any
    const created = { _id: 'w1', ...input } as any
    ;(service.createWatering as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createWatering(input)
    expect(result).toEqual(created)
    expect(service.createWatering).toHaveBeenCalledWith(input)
  })

  it('waterings should return from service', async () => {
    const items = [{ _id: 'w1' }] as any
    ;(service.findAllWaterings as jest.Mock).mockResolvedValue(items)
    const result = await resolver.waterings()
    expect(result).toEqual(items)
    expect(service.findAllWaterings).toHaveBeenCalled()
  })

  it('watering should delegate by id', async () => {
    const item = { _id: 'w1' } as any
    ;(service.getWateringById as jest.Mock).mockResolvedValue(item)
    const result = await resolver.watering('id1' as any)
    expect(result).toEqual(item)
    expect(service.getWateringById).toHaveBeenCalledWith('id1')
  })

  it('updateWatering should delegate', async () => {
    const update = { _id: 'id1', date: new Date('2020-02-02') } as any
    const updated = { _id: 'id1', ...update } as any
    ;(service.updateWatering as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateWatering(update)
    expect(result).toEqual(updated)
    expect(service.updateWatering).toHaveBeenCalledWith('id1', update)
  })

  it('removeWatering should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeWatering as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeWatering('id1' as any)
    expect(result).toEqual(removed)
    expect(service.removeWatering).toHaveBeenCalledWith('id1')
  })
})
