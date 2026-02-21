import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { Watering } from './entities/watering.entity'
import { WateringService } from './watering.service'

describe('WateringService', () => {
  let service: WateringService

  let mockModel: any

  let findChain: any
  let findByIdChain: any
  let updateChain: any

  beforeEach(async () => {
    const save = jest.fn()
    mockModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newWatering',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newWatering', ...dto })
    }))

    findChain = {
      sort: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([{ _id: 'w1' }])
    }
    mockModel.find = jest.fn().mockReturnValue(findChain)

    findByIdChain = {
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ _id: 'w1' })
    }
    mockModel.findById = jest.fn().mockReturnValue(findByIdChain)

    updateChain = {
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ _id: 'w2' })
    }
    mockModel.findByIdAndUpdate = jest.fn().mockReturnValue(updateChain)

    mockModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WateringService,
        {
          provide: getModelToken(Watering.name),
          useValue: mockModel
        }
      ]
    }).compile()

    service = module.get<WateringService>(WateringService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createWatering should save', async () => {
    const input = { date: new Date('2020-01-01') } as any
    const result = await service.createWatering(input)
    expect(result).toEqual({ _id: 'newWatering', date: new Date('2020-01-01') })
    expect(mockModel).toHaveBeenCalledWith(input)
  })

  it('findAllWaterings should sort and populate', async () => {
    const result = await service.findAllWaterings()
    expect(result).toEqual([{ _id: 'w1' }])
    expect(mockModel.find).toHaveBeenCalled()
    expect(findChain.sort).toHaveBeenCalledWith({ date: -1 })
    expect(findChain.populate).toHaveBeenCalledWith('fertilizers.fertilizer')
  })

  it('getWateringById should populate fertilizers', async () => {
    const result = await service.getWateringById('id1' as any)
    expect(result).toEqual({ _id: 'w1' })
    expect(mockModel.findById).toHaveBeenCalledWith('id1')
    expect(findByIdChain.populate).toHaveBeenCalledWith(
      'fertilizers.fertilizer'
    )
  })

  it('updateWatering should update with new:true and populate', async () => {
    const update = { _id: 'id1', date: new Date('2020-02-02') } as any
    const result = await service.updateWatering('id1' as any, update)
    expect(result).toEqual({ _id: 'w2' })
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith('id1', update, {
      new: true
    })
    expect(updateChain.populate).toHaveBeenCalledWith('fertilizers.fertilizer')
  })

  it('removeWatering should delete', async () => {
    const result = await service.removeWatering('id1' as any)
    expect(result).toEqual({ acknowledged: true })
    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('id1')
  })
})
