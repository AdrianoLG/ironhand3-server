import { Test, TestingModule } from '@nestjs/testing'

import { PlantResolver } from './plant.resolver'
import { PlantService } from './plant.service'

describe('PlantResolver', () => {
  let resolver: PlantResolver

  let service: PlantService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlantResolver,
        {
          provide: PlantService,
          useValue: {
            createPlant: jest.fn(),
            findAllPlants: jest.fn(),
            getPlantById: jest.fn(),
            updatePlant: jest.fn(),
            removePlant: jest.fn()
          }
        }
      ]
    }).compile()

    resolver = module.get<PlantResolver>(PlantResolver)
    service = module.get<PlantService>(PlantService)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('createPlant should delegate', async () => {
    const input = { name: 'Plant' } as any
    const created = { _id: 'p1', name: 'Plant' } as any
    ;(service.createPlant as jest.Mock).mockResolvedValue(created)
    const result = await resolver.createPlant(input)
    expect(result).toEqual(created)
    expect(service.createPlant).toHaveBeenCalledWith(input)
  })

  it('plants should return from service', async () => {
    const items = [{ _id: 'p1' }] as any
    ;(service.findAllPlants as jest.Mock).mockResolvedValue(items)
    const result = await resolver.plants()
    expect(result).toEqual(items)
    expect(service.findAllPlants).toHaveBeenCalled()
  })

  it('plant should delegate by id', async () => {
    const item = { _id: 'p1' } as any
    ;(service.getPlantById as jest.Mock).mockResolvedValue(item)
    const result = await resolver.plant('id1' as any)
    expect(result).toEqual(item)
    expect(service.getPlantById).toHaveBeenCalledWith('id1')
  })

  it('updatePlant should delegate', async () => {
    const update = { _id: 'id1', name: 'Updated' } as any
    const updated = { _id: 'id1', name: 'Updated' } as any
    ;(service.updatePlant as jest.Mock).mockResolvedValue(updated)
    const result = await resolver.updatePlant(update)
    expect(result).toEqual(updated)
    expect(service.updatePlant).toHaveBeenCalledWith('id1', update)
  })

  it('removePlant should delegate', async () => {
    const removed = { acknowledged: true } as any
    ;(service.removePlant as jest.Mock).mockResolvedValue(removed)
    const result = await resolver.removePlant('id1' as any)
    expect(result).toEqual(removed)
    expect(service.removePlant).toHaveBeenCalledWith('id1')
  })
})
