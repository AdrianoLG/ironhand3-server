import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { CropContainerService } from './crop-container.service'
import { CropContainer } from './entities/crop-container.entity'

describe('CropContainerService', () => {
  let service: CropContainerService

  let mockModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newCropContainer',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newCropContainer', ...dto })
    }))

    mockModel.find = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([{ _id: 'cc1' }])
    })
    mockModel.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: 'cc1' })
    })
    mockModel.findByIdAndUpdate = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ _id: 'cc2' })
    })
    mockModel.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropContainerService,
        {
          provide: getModelToken(CropContainer.name),
          useValue: mockModel
        }
      ]
    }).compile()

    service = module.get<CropContainerService>(CropContainerService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createCropContainer should save', async () => {
    const input = { name: 'Pot' } as any
    const result = await service.createCropContainer(input)
    expect(result).toEqual({ _id: 'newCropContainer', name: 'Pot' })
    expect(mockModel).toHaveBeenCalledWith(input)
  })

  it('findAllCropContainers should call find().exec()', async () => {
    const result = await service.findAllCropContainers()
    expect(result).toEqual([{ _id: 'cc1' }])
    expect(mockModel.find).toHaveBeenCalled()
  })

  it('getCropContainerById should call findById(id).exec()', async () => {
    const result = await service.getCropContainerById('id1' as any)
    expect(result).toEqual({ _id: 'cc1' })
    expect(mockModel.findById).toHaveBeenCalledWith('id1')
  })

  it('updateCropContainer should call findByIdAndUpdate with new:true', async () => {
    const update = { _id: 'id1', name: 'Updated' } as any
    const result = await service.updateCropContainer('id1' as any, update)
    expect(result).toEqual({ _id: 'cc2' })
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith('id1', update, {
      new: true
    })
  })

  it('removeCropContainer should call findByIdAndDelete(id).exec()', async () => {
    const result = await service.removeCropContainer('id1' as any)
    expect(result).toEqual({ acknowledged: true })
    expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('id1')
  })
})
