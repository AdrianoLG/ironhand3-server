import { Test, TestingModule } from '@nestjs/testing'

import { FertilizerResolver } from './fertilizer.resolver'
import { FertilizerService } from './fertilizer.service'

describe('FertilizerResolver', () => {
  let resolver: FertilizerResolver

  let service: FertilizerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FertilizerResolver,
        {
          provide: FertilizerService,
          useValue: {
            createFertilizer: jest.fn(),
            findAllFertilizers: jest.fn(),
            getFertilizerById: jest.fn(),
            updateFertilizer: jest.fn(),
            removeFertilizer: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<FertilizerResolver>(FertilizerResolver)
    service = module.get<FertilizerService>(FertilizerService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('createFertilizer should delegate', async () => {
    const input = { name: 'NPK' } as any
    const created = { _id: 'f1', name: 'NPK' } as any
    ;(service.createFertilizer as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createFertilizer(input)
    expect(result).toEqual(created)
    expect(service.createFertilizer).toHaveBeenCalledWith(input)
  })

  it('fertilizers should return from service', async () => {
    const items = [{ _id: 'f1' }] as any
    ;(service.findAllFertilizers as jest.Mock).mockResolvedValue(items)
    const result = await resolver.fertilizers()
    expect(result).toEqual(items)
    expect(service.findAllFertilizers).toHaveBeenCalled()
  })

  it('fertilizer should delegate by id', async () => {
    const item = { _id: 'f1' } as any
    ;(service.getFertilizerById as jest.Mock).mockResolvedValue(item)
    const result = await resolver.fertilizer('id1' as any)
    expect(result).toEqual(item)
    expect(service.getFertilizerById).toHaveBeenCalledWith('id1')
  })

  it('updateFertilizer should delegate', async () => {
    const update = { _id: 'id1', name: 'Updated' } as any
    const updated = { _id: 'id1', name: 'Updated' } as any
    ;(service.updateFertilizer as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateFertilizer(update)
    expect(result).toEqual(updated)
    expect(service.updateFertilizer).toHaveBeenCalledWith('id1', update)
  })

  it('removeFertilizer should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeFertilizer as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeFertilizer('id1' as any)
    expect(result).toEqual(removed)
    expect(service.removeFertilizer).toHaveBeenCalledWith('id1')
  })
})
