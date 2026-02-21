import { Test, TestingModule } from '@nestjs/testing'

import { CropContainerResolver } from './crop-container.resolver'
import { CropContainerService } from './crop-container.service'

describe('CropContainerResolver', () => {
  let resolver: CropContainerResolver

  let service: CropContainerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropContainerResolver,
        {
          provide: CropContainerService,
          useValue: {
            createCropContainer: jest.fn(),
            findAllCropContainers: jest.fn(),
            getCropContainerById: jest.fn(),
            updateCropContainer: jest.fn(),
            removeCropContainer: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<CropContainerResolver>(CropContainerResolver)
    service = module.get<CropContainerService>(CropContainerService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('createCropContainer should delegate', async () => {
    const input = { name: 'Pot' } as any
    const created = { _id: 'cc1', name: 'Pot' } as any
    ;(service.createCropContainer as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createCropContainer(input)
    expect(result).toEqual(created)
    expect(service.createCropContainer).toHaveBeenCalledWith(input)
  })

  it('cropContainers should return from service', async () => {
    const items = [{ _id: 'cc1' }] as any
    ;(service.findAllCropContainers as jest.Mock).mockResolvedValue(items)
    const result = await resolver.cropContainers()
    expect(result).toEqual(items)
    expect(service.findAllCropContainers).toHaveBeenCalled()
  })

  it('cropContainer should delegate by id', async () => {
    const item = { _id: 'cc1' } as any
    ;(service.getCropContainerById as jest.Mock).mockResolvedValue(item)
    const result = await resolver.cropContainer('id1' as any)
    expect(result).toEqual(item)
    expect(service.getCropContainerById).toHaveBeenCalledWith('id1')
  })

  it('updateCropContainer should delegate', async () => {
    const update = { _id: 'id1', name: 'Updated' } as any
    const updated = { _id: 'id1', name: 'Updated' } as any
    ;(service.updateCropContainer as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updateCropContainer(update)
    expect(result).toEqual(updated)
    expect(service.updateCropContainer).toHaveBeenCalledWith('id1', update)
  })

  it('removeCropContainer should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removeCropContainer as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removeCropContainer('id1' as any)
    expect(result).toEqual(removed)
    expect(service.removeCropContainer).toHaveBeenCalledWith('id1')
  })
})
