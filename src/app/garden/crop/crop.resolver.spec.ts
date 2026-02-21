import { Test, TestingModule } from '@nestjs/testing'

import { CropResolver } from './crop.resolver'
import { CropService } from './crop.service'

describe('CropResolver', () => {
  let resolver: CropResolver

  let service: CropService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropResolver,
        {
          provide: CropService,
          useValue: {
            createCrop: jest.fn(),
            findAllCrops: jest.fn(),
            getCropById: jest.fn(),
            updateCrop: jest.fn(),
            removeCrop: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<CropResolver>(CropResolver)
    service = module.get<CropService>(CropService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('createCrop should delegate', async () => {
    const input = { name: 'Grow 2026' } as any
    const created = { _id: 'c1', name: 'Grow 2026' } as any
    ;(service.createCrop as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createCrop(input)
    expect(result).toEqual(created)
    expect(service.createCrop).toHaveBeenCalledWith(input)
  })

  it('crops should return from service', async () => {
    const items = [{ _id: 'c1' }] as any
    ;(service.findAllCrops as jest.Mock).mockResolvedValue(items)
    const result = await resolver.crops()
    expect(result).toEqual(items)
    expect(service.findAllCrops).toHaveBeenCalled()
  })

  it('crop should delegate by id', async () => {
    const item = { _id: 'c1' } as any
    ;(service.getCropById as jest.Mock).mockResolvedValue(item)
    const result = await resolver.crop('id1' as any)
    expect(result).toEqual(item)
    expect(service.getCropById).toHaveBeenCalledWith('id1')
  })

  it('updateCrop should delegate', async () => {
    const update = { _id: 'id1', name: 'Updated' } as any
    const updated = { _id: 'id1', name: 'Updated' } as any
    ;(service.updateCrop as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateCrop(update)
    expect(result).toEqual(updated)
    expect(service.updateCrop).toHaveBeenCalledWith('id1', update)
  })

  it('removeCrop should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeCrop as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeCrop('id1' as any)
    expect(result).toEqual(removed)
    expect(service.removeCrop).toHaveBeenCalledWith('id1')
  })
})
