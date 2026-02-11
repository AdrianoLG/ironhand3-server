import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { UserService } from './user.service'

describe('UserService', () => {
  let service: UserService

  let mockUserModel: any

  beforeEach(async () => {
    const save = jest.fn()
    mockUserModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newUser',
      ...dto,
      save: save.mockResolvedValue({ _id: 'newUser', ...dto })
    }))
    mockUserModel.find = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue([{ _id: 'u1' }]) })
    mockUserModel.findById = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'uid' }) })
    mockUserModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'upd' }) })
    mockUserModel.deleteOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getModelToken('User'), useValue: mockUserModel }
      ]
    }).compile()

    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createUser should call save on model instance', async () => {
    const dto: any = { name: 'A' }
    const res = await service.createUser(dto)
    expect(res).toEqual({ _id: 'newUser', name: 'A' })
    expect(mockUserModel).toHaveBeenCalledWith(dto)
  })

  it('findAllUsers should return list', async () => {
    const res = await service.findAllUsers()
    expect(res).toEqual([{ _id: 'u1' }])
    expect(mockUserModel.find).toHaveBeenCalled()
  })

  it('getUserById should call findById', async () => {
    const res = await service.getUserById('x' as any)
    expect(res).toEqual({ _id: 'uid' })
    expect(mockUserModel.findById).toHaveBeenCalledWith('x')
  })

  it('updateUser should call findByIdAndUpdate', async () => {
    const res = await service.updateUser('u1' as any, { name: 'Upd' } as any)
    expect(res).toEqual({ _id: 'upd' })
    expect(mockUserModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { name: 'Upd' },
      { new: true }
    )
  })

  it('removeUser should call deleteOne', async () => {
    const res = await service.removeUser('r1' as any)
    expect(res).toEqual({ acknowledged: true })
    expect(mockUserModel.deleteOne).toHaveBeenCalledWith({ _id: 'r1' })
  })
})
