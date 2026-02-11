import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { BookService } from './book.service'

describe('BookService', () => {
  let service: BookService

  let mockBookModel: any
  let mockAuthorModel: any

  beforeEach(async () => {
    const bookInstanceSave = jest.fn()
    mockBookModel = jest.fn().mockImplementation((dto) => ({
      _id: 'newId',
      ...dto,
      save: bookInstanceSave.mockResolvedValue({ _id: 'newId', ...dto })
    }))
    mockBookModel.countDocuments = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(2) })
    const findChain = {
      populate: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([{ _id: 'b1' }, { _id: 'b2' }])
    }
    mockBookModel.find = jest.fn().mockReturnValue(findChain)
    mockBookModel.findById = jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue({ _id: 'bid', title: 'T' })
    })
    mockBookModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue({ _id: 'upd' }) })
    mockBookModel.deleteOne = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ acknowledged: true })
    })

    mockAuthorModel = {
      findByIdAndUpdate: jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue({}) })
    }

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        { provide: getModelToken('Book'), useValue: mockBookModel },
        { provide: getModelToken('Author'), useValue: mockAuthorModel }
      ]
    }).compile()

    service = module.get<BookService>(BookService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('createBook should create and update authors', async () => {
    const dto: any = { title: 'X', authors: ['a1', 'a2'] }
    const result = await service.createBook(dto)
    expect(result).toEqual({ _id: 'newId', title: 'X', authors: ['a1', 'a2'] })
    expect(mockAuthorModel.findByIdAndUpdate).toHaveBeenCalledTimes(2)
    expect(mockAuthorModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'a1',
      expect.any(Object),
      { new: true }
    )
  })

  it('findAllBooks should return list and count', async () => {
    const res = await service.findAllBooks(10, 0)
    expect(res.booksCount).toBe(2)
    expect(res.bookList).toEqual([{ _id: 'b1' }, { _id: 'b2' }])
    expect(mockBookModel.find).toHaveBeenCalled()
  })

  it('getBookById should populate author', async () => {
    const res = await service.getBookById('id' as any)
    expect(res).toEqual({ _id: 'bid', title: 'T' })
    expect(mockBookModel.findById).toHaveBeenCalledWith('id')
  })

  it('updateBook should call findByIdAndUpdate', async () => {
    const res = await service.updateBook('u1' as any, { title: 'Up' } as any)
    expect(res).toEqual({ _id: 'upd' })
    expect(mockBookModel.findByIdAndUpdate).toHaveBeenCalledWith(
      'u1',
      { title: 'Up' },
      { new: true }
    )
  })

  it('removeBook should deleteOne', async () => {
    const res = await service.removeBook('r1' as any)
    expect(res).toEqual({ acknowledged: true })
    expect(mockBookModel.deleteOne).toHaveBeenCalledWith({ _id: 'r1' })
  })
})
