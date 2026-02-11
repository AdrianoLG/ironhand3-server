import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { AuthorService } from './author.service'

describe('AuthorService', () => {
  let service: AuthorService

  let mockAuthorModel: any
  let mockBookModel: any

  beforeEach(async () => {
    const authorSave = jest.fn()
    mockAuthorModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newAuth',
      ...dto,
      save: authorSave.mockResolvedValue({ _id: 'newAuth', ...dto })
    }))
    mockAuthorModel.countDocuments = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(3) })
    const findChain = {
      populate: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([{ _id: 'a1' }, { _id: 'a2' }])
    }
    mockAuthorModel.find = jest.fn().mockReturnValue(findChain)
    mockAuthorModel.findById = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'aid' }) })
    mockAuthorModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'upd' }) })
    mockAuthorModel.deleteOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    mockBookModel = {
      findByIdAndUpdate: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue({}) })
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        { provide: getModelToken('Author'), useValue: mockAuthorModel },
        { provide: getModelToken('Book'), useValue: mockBookModel }
      ]
    }).compile()

    service = module.get<AuthorService>(AuthorService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createAuthor should create and update books', async () => {
    const dto: any = { name: 'N', books: ['b1', 'b2'] }
    const res = await service.createAuthor(dto)
    expect(res).toEqual({ _id: 'newAuth', name: 'N', books: ['b1', 'b2'] })
    expect(mockBookModel.findByIdAndUpdate).toHaveBeenCalledTimes(2)
    expect(mockBookModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'b1',
      expect.any(Object),
      { new: true }
    )
  })

  it('findAllAuthors should return list and count', async () => {
    const res = await service.findAllAuthors(5, 0)
    expect(res.authorsCount).toBe(3)
    expect(res.authorList).toEqual([{ _id: 'a1' }, { _id: 'a2' }])
  })

  it('getAuthorById should call findById', async () => {
    const res = await service.getAuthorById('id' as any)
    expect(res).toEqual({ _id: 'aid' })
    expect(mockAuthorModel.findById).toHaveBeenCalledWith('id')
  })

  it('updateAuthor should call findByIdAndUpdate', async () => {
    const res = await service.updateAuthor('u1' as any, { name: 'Up' } as any)
    expect(res).toEqual({ _id: 'upd' })
    expect(mockAuthorModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { name: 'Up' },
      { new: true }
    )
  })

  it('removeAuthor should deleteOne', async () => {
    const res = await service.removeAuthor('r1' as any)
    expect(res).toEqual({ acknowledged: true })
    expect(mockAuthorModel.deleteOne).toHaveBeenCalledWith({ _id: 'r1' })
  })
})
